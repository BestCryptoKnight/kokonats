import React, { useState, useEffect } from "react";
import { FlatList, Image, Linking, ScrollView, Text, View } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import BackButton from "../../../../components/BackButton";
import EnergyDisplay from "../../../../components/main/EnergyDisplay";
import EventBus from "react-native-event-bus";
import { GO_TO_STORE } from "../../../../events/types";
import { getEnergyBalance, getGameList, getUserInfo } from "../../../../redux/selectors";
import ShareButton from "../../../../components/main/home/ShareButton";
import TournamentPlayButton from "../../../../components/main/home/TournamentPlayButton";
import RuleItem from "../../../../components/main/home/RuleItem";
import { hScaleRatio } from "../../../../utils/scailing";
import RankingItem from "../../../../components/main/home/RankingItem";
import Sponsor from "../../../../components/Sponsor";
import { ConfirmDialogType, GAME_LINK, SHARE_USER, SPONSOR_LINK } from "../../../../consts/config";
import LinearGradient from "react-native-linear-gradient";
import { useTranslation } from "react-i18next";
import * as gameActions from "../../../../redux/actions/gameActions";
import * as storeActions from "../../../../redux/actions/storeActions";
import { PlayType, TournamentStatus } from "../../../../consts/gameConfig";
import { getTournamentStatus } from "../../../../utils/gameUtils";
import KokoConfirmDialog from "../../../../components/KokoConfirmDialog";
import { shareOnTwitter } from "react-native-social-share";
import i18n from "../../../../utils/i18n";

const TournamentDetailScreen = props => {
  const { t } = useTranslation();
  const { tournament } = props.navigation.state.params;
  const [playableTournament, setPlayableTournament] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [showEntryFeeDialog, setShowEntryFeeDialog] = useState(false);
  let showResult = false;
  let play;

  useEffect(() => {
    fetchTournamentPlayable();
  }, []);

  useEffect(() => {
    fetchRankings();
  }, [playableTournament]);

  const fetchTournamentPlayable = () => {
    props.gameActions.fetchTournamentPlayable(
      tournament.id,
      (data) => onTournamentPlayableFetched(data),
      (error) => onTournamentPlayableFailed(error));
  };

  const onTournamentPlayableFetched = (data) => {
    setPlayableTournament(data);
  };

  const onTournamentPlayableFailed = (error) => {
    setPlayableTournament(null);
  };

  const fetchRankings = () => {
    if (playableTournament) {
      const status = getTournamentStatus(tournament, playableTournament, joinedAlready());
      switch (status) {
        case TournamentStatus.notStartedYet:
          setRankings([]);
          return;
        case TournamentStatus.finished:
          fetchFinishedRanking();
          return;
        default:
          fetchCurrentRanking(playableTournament.id);
      }
    }
  };

  const fetchCurrentRanking = (tournamentId) => {
    props.gameActions.fetchTournamentRanking(
      tournamentId,
      (data) => onRankingFetched(data),
      (error) => onRankingFailed(error));
  };

  const onRankingFetched = (data) => {
    setRankings(data);
    if (showResult) {
      props.navigation.navigate("GameResultScreen", {
        result: data,
        tournament,
        game: getGame(),
        onPlayAgain: onEnterPress,
      });
    }
  };

  const onRankingFailed = (error) => {
  };

  const fetchFinishedRanking = () => {
    props.gameActions.fetchTournamentHistory(
      tournament.id,
      (data) => onHistoryFetched(data),
      (error) => onHistoryFailed(error),
    );
  };

  const onHistoryFetched = (data) => {
    fetchCurrentRanking(data[0].id);
  };

  const onHistoryFailed = (error) => {

  };

  const joinedAlready = () => {
    const records = rankings.filter(ranking => ranking.id === props.me.id);
    return records && records.length > 0;
  };

  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onEnergyPress = () => {
    EventBus.getInstance().fireEvent(GO_TO_STORE);
    onBackPress();
  };

  const onShare = () => {
    const gameTitle = getGame().name;
    const tournamentName = tournament.tournamentName;
    const text = t("share.detail.tournament", { game_title: gameTitle, tournament_name: tournamentName });
    shareOnTwitter({
        "text": `${text} #@${SHARE_USER} ${GAME_LINK}`,
        "link": GAME_LINK
      },
      (results) => {
        if (results === "not_available") {
          let twitterParameters = [];
          twitterParameters.push("url=" + encodeURI(GAME_LINK));
          twitterParameters.push("text=" + encodeURI(text));
          twitterParameters.push("via=" + encodeURI(SHARE_USER));
          const url =
            "https://twitter.com/intent/tweet?"
            + twitterParameters.join("&");
          Linking.openURL(url)
            .then((data) => {
            })
            .catch(() => {
            });
        }
        console.log(results);
      },
    );
  };

  const onEnterPress = () => {
    if (tournament.entryFee > 0) {
      setShowEntryFeeDialog(true);
    } else {
      joinTournament();
    }
  };

  const openSponsor = async () => {
    await Linking.canOpenURL(SPONSOR_LINK);
    Linking.openURL(SPONSOR_LINK);
  };

  const copySponsor = () => {
    Clipboard.setString(SPONSOR_LINK);
  };

  const renderRankingItem = (item) => {
    return (<RankingItem item={item.item} index={item.index} />);
  };

  const onBackEntryFee = () => {
    setShowEntryFeeDialog(false);
  };

  const onOkEntryFee = () => {
    setShowEntryFeeDialog(false);
    joinTournament();
  };

  const joinTournament = () => {
    props.gameActions.joinTournament(playableTournament.id, onJoinSuccess, onJoinFail);
  };

  const onJoinSuccess = (tournamentPlay) => {
    play = tournamentPlay;
    props.storeActions.fetchEnergy();
    props.gameActions.fetchGameAuthToken(tournament.gameId, onAuthGameSuccess, onAuthGameFail);
  };

  const onJoinFail = () => {
  };

  const onAuthGameSuccess = (token) => {
    playTournament(token);
  };

  const onAuthGameFail = () => {
  };

  const getGame = () => {
    return props.games.filter(value => value.id === tournament.gameId)[0];
  };

  const playTournament = (token) => {
    showResult = false;
    let game = getGame();
    props.navigation.navigate("GamePlayScreen", {
      token: token,
      playId: play.id,
      playType: PlayType.tournament,
      gameUrl: game.cdnUrl,
      duration: tournament.durationPlaySecond,
      onGameEnd,
    });
  };

  const onGameEnd = () => {
    showResult = true;
    fetchRankings();
  };

  return (
    <View style={styles.container}>
      <View style={styles.appbarContainer}>
        <BackButton onPress={onBackPress} />
        <EnergyDisplay balance={props.energy} onPress={onEnergyPress} />
      </View>
      <ScrollView style={{ flex: 1, marginTop: hScaleRatio(24) }} showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}>
        <View style={styles.coverContainer}>
          <Image style={styles.cover} source={{ uri: tournament.coverImageUrl }} />
          <LinearGradient colors={["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0)"]} start={{ x: 0.5, y: 1 }}
                          end={{ x: 0.5, y: 0 }} style={styles.coverGradient} />
          <Text style={styles.name}>{tournament.tournamentName}</Text>
          <ShareButton style={styles.share} onPress={onShare} />
        </View>
        <TournamentPlayButton style={styles.play} tournamentClass={tournament} playableTournament={playableTournament}
                              joinedAlready={joinedAlready()} onPress={onEnterPress} />
        <Text style={styles.description}>{tournament.description}</Text>
        <Text style={styles.rule}>{t("game.rule")}</Text>
        {
          JSON.parse(tournament.rankingPayout).map(rule => <RuleItem content={rule} />)
        }
        <Sponsor style={styles.sponsor} onPress={openSponsor} onCopyLink={copySponsor} />
        {
          rankings && rankings.length > 0 && <Text style={styles.rule}>{t("game.ranking")}</Text>
        }
        {
          rankings && rankings.length > 0 &&
          <FlatList data={rankings.slice(0, Math.min(5, rankings.length))} renderItem={renderRankingItem} />
        }
      </ScrollView>
      <KokoConfirmDialog
        visible={showEntryFeeDialog}
        type={ConfirmDialogType.question}
        title={t("game.entry_fee.title")}
        message={t("game.entry_fee.message", { energy: tournament.entryFee })}
        onCancel={onBackEntryFee}
        onOk={onOkEntryFee} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    me: getUserInfo(state),
    energy: getEnergyBalance(state),
    games: getGameList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    gameActions: bindActionCreators(gameActions, dispatch),
    storeActions: bindActionCreators(storeActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentDetailScreen);
