import React, { useState, useEffect } from "react";
import { FlatList, Image, Linking, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
import Sponsor from "../../../../components/Sponsor";
import { ConfirmDialogType, SPONSOR_LINK } from "../../../../consts/config";
import LinearGradient from "react-native-linear-gradient";
import { useTranslation } from "react-i18next";
import "../../../../utils/i18n";
import * as gameActions from "../../../../redux/actions/gameActions";
import * as storeActions from "../../../../redux/actions/storeActions";
import KokoConfirmDialog from "../../../../components/KokoConfirmDialog";
import { hScaleRatio } from "../../../../utils/scailing";
import Payout from "../../../../../assets/images/payout.svg";
import { PlayType } from "../../../../consts/gameConfig";
import MatchPairingDialog from "../../../../components/main/home/MatchPairingDialog";
import { fetchMatchResult } from "../../../../redux/actions/gameActions";
import { errorMessage } from "../../../../utils/alerts";

const MatchDetailScreen = props => {
  const { t } = useTranslation();
  const { match } = props.navigation.state.params;
  const [showEntryFeeDialog, setShowEntryFeeDialog] = useState(false);
  const [isPairing, setIsPairing] = useState(false);
  const [opponents, setOpponents] = useState([]);
  let playId = 0;
  let showResult = false;

  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onEnergyPress = () => {
    EventBus.getInstance().fireEvent(GO_TO_STORE);
    onBackPress();
  };

  const onBackEntryFee = () => {
    setShowEntryFeeDialog(false);
  };

  const onOkEntryFee = () => {
    setShowEntryFeeDialog(false);
    startSession();
  };

  const onShare = () => {
  };

  const onPlayPress = () => {
    if (match.entryFee > 0) {
      setShowEntryFeeDialog(true);
    } else {
      startSession();
    }
  };

  const openSponsor = async () => {
    await Linking.canOpenURL(SPONSOR_LINK);
    Linking.openURL(SPONSOR_LINK);
  };

  const copySponsor = () => {
    Clipboard.setString(SPONSOR_LINK);
  };

  const startSession = () => {
    props.gameActions.startMatchSession(match.id, onStartSessionSuccess, onStartSessionFail);
  };

  const onStartSessionSuccess = (sessionId) => {
    props.storeActions.fetchEnergy();
    startPairing(sessionId);
  };

  const onStartSessionFail = () => {
    stopPairing();
  };

  const startPairing = (sessionId) => {
    setIsPairing(true);
    props.gameActions.startMatchPairing(sessionId, onStartPairingSuccess, onStartPairingFail);
  };

  const onStartPairingSuccess = (matchPlayId, users) => {
    playId = matchPlayId;
    setOpponents(users);
    props.gameActions.fetchGameAuthToken(match.gameId, onAuthGameSuccess, onAuthGameFail);
  };

  const onStartPairingFail = (error) => {
    setIsPairing(false);
    errorMessage({message: "Rival is not available"});
  };

  const stopPairing = () => {
    setIsPairing(false);
  };

  const onAuthGameSuccess = (token) => {
    playMatch(token);
    stopPairing();
  };

  const onAuthGameFail = () => {
    stopPairing();
  };

  const playMatch = (token) => {
    showResult = false;
    let game = getGame();
    props.navigation.navigate("GamePlayScreen", {
      token: token,
      playId: playId,
      playType: PlayType.match,
      gameUrl: game.cdnUrl,
      duration: match.durationPlaySecond,
      onGameEnd,
    });
  };

  const onGameEnd = () => {
    showResult = true;
    playId = 0;
    setOpponents([]);
    fetchMatchResult();
  };

  const fetchMatchResult = () => {
    props.gameActions.fetchMatchResult(playId, onResultSuccess, onResultFail);
  };

  const onResultSuccess = (result) => {
    if (showResult) {
      props.navigation.navigate("MatchResultScreen", {
        result,
        game: getGame(),
        onPlayAgain: onPlayPress,
      });
    }
  };

  const onResultFail = () => {};

  const getGame = () => {
    return props.games.filter(value => value.id === match.gameId)[0];
  };

  return (
    <View style={styles.container}>
      <View style={styles.appbarContainer}>
        <BackButton onPress={onBackPress} />
        <EnergyDisplay balance={props.energy} onPress={onEnergyPress} />
      </View>
      <ScrollView
        style={{ flex: 1, marginTop: hScaleRatio(24) }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.coverContainer}>
          <Image style={styles.cover} source={{ uri: match.coverImageUrl }} />
          <LinearGradient colors={["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0)"]} start={{ x: 0.5, y: 1 }}
                          end={{ x: 0.5, y: 0 }} style={styles.coverGradient} />
          <Text style={styles.name}>{match.matchName}</Text>
          <ShareButton style={styles.share} onPress={onShare} />
        </View>
        <TouchableOpacity style={styles.play} onPress={onPlayPress}>
          <LinearGradient style={styles.gradient} colors={['#0038F5', '#9F03FF']} start={{x: 0.3, y: 0}} end={{x: 0.9, y: 1}}>
            <Text style={styles.playText}>{t("game.play_now")}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.description}>{match.description}</Text>
        <Sponsor style={styles.sponsor} onPress={openSponsor} onCopyLink={copySponsor} />
        <Text style={styles.rule}>{t("game.rule")}</Text>
        <View style={styles.ruleContainer}>
          <Text style={styles.winner}>Winner</Text>
          <View style={{flex: 1}}/>
          <Payout width={30} height={26} />
          <Text style={styles.payout}>+{match.winningPayout}</Text>
        </View>
      </ScrollView>
      <KokoConfirmDialog
        visible={showEntryFeeDialog}
        type={ConfirmDialogType.question}
        title={t("game.entry_fee.title")}
        message={t("game.entry_fee.message", { energy: match.entryFee })}
        onCancel={onBackEntryFee}
        onOk={onOkEntryFee} />
      <MatchPairingDialog visible={isPairing} user={props.me} opponents={opponents}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetailScreen);
