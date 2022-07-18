import React, { useState, useEffect } from "react";
import { FlatList, Linking, Text, TouchableOpacity, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import KokoStatusBar from "../../../../components/KokoStatusBar";
import { getUserInfo } from "../../../../redux/selectors";
import * as gameActions from "../../../../redux/actions/gameActions";
import { useTranslation } from "react-i18next";
import "../../../../utils/i18n";
import ShareButton from "../../../../components/main/home/ShareButton";
import LinearGradient from "react-native-linear-gradient";
import colors from "../../../../theme/colors";
import { wScale } from "../../../../utils/scailing";
import i18n from "../../../../utils/i18n";
import { shareOnTwitter } from "react-native-social-share";
import { GAME_LINK, SHARE_USER } from "../../../../consts/config";
import { getEnglishOrderString } from "../../../../utils/stringUtils";


const MatchResultScreen = props => {
  const { t } = useTranslation();
  const { result, game, onPlayAgain } = props.navigation.state.params;
  const playingStatus = 2;

  const onShare = () => {
    const gameTitle = game.name;
    const opponent = result.players.filter(player => player.username !== props.me.userName)[0];
    const text = t(result.result === "W" ? "share.result.match.win" : result.result === "D" ? "share.result.match.draw" : "share.result.match.lose", {
      game_title: gameTitle,
      username: opponent.username,
    });
    shareOnTwitter({
        "text": `${text} #@${SHARE_USER} ${GAME_LINK}`,
        "link": GAME_LINK,
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

  const getMyResult = () => {
    if (result.state === playingStatus) return "PLAYING";
    switch (result.result) {
      case "W":
        return "WIN";
      case "L":
        return "LOST";
      case "D":
        return "DRAWN";
    }
  };

  const getUserResult = (userResult) => {
    if (userResult.state === playingStatus) return "P";
    return userResult.result;
  };

  const onBack = () => {
    props.navigation.goBack();
  };

  const renderRankingItem = (item) => {
    const rankingItem = item.item;
    const isMe = rankingItem.username === props.me.userName;
    return (<View style={styles.rankingItemContainer}>
      <View style={[styles.rankingCircle, isMe && { backgroundColor: "rgba(255, 203, 0, 0.1)" }]}>
        <Text style={styles.rankingText}>{getUserResult(rankingItem)}</Text>
      </View>
      <View style={{ flex: 1, marginLeft: wScale(10) }}>
        <Text style={[styles.points, isMe && { color: colors.yellow }]}>{rankingItem.totalScore.toLocaleString()}</Text>
        <Text style={[styles.username, isMe && { color: colors.yellow }]}>{rankingItem.username}</Text>
      </View>
    </View>);
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <KokoStatusBar />
      <View style={styles.content}>
        <Text style={styles.title}>{t("game.result.ranking")}</Text>
        <View style={styles.rankingContainer}>
          <Text style={styles.ranking}>{getMyResult()}</Text>
          {
            result.state !== playingStatus && <ShareButton onPress={onShare} />
          }
        </View>
        <Text style={styles.score}>{t("game.result.score")}</Text>
        <View style={styles.scoreContainer}>
          <FlatList
            data={result.players}
            renderItem={renderRankingItem}
            ItemSeparatorComponent={renderSeparator}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onBack}>
            <Text style={styles.buttonText}>{t("game.result.back")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.okButton, { marginLeft: 25 }]} onPress={() => {
            props.navigation.goBack();
            onPlayAgain();
          }}>
            <LinearGradient style={styles.gradient} colors={["#0038F5", "#9F03FF"]} start={{ x: 0.3, y: 0 }}
                            end={{ x: 0.9, y: 1 }}>
              <Text style={styles.buttonText}>{t("game.result.play_again")}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    me: getUserInfo(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    gameActions: bindActionCreators(gameActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchResultScreen);
