import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import KokoStatusBar from "../../../../components/KokoStatusBar";
import { WebView } from "react-native-webview";
import { PlayType } from "../../../../consts/gameConfig";
import { getUserInfo } from "../../../../redux/selectors";
import * as gameActions from "../../../../redux/actions/gameActions";


const GamePlayScreen = props => {
  const { token, playId, playType, gameUrl, duration, onGameEnd } = props.navigation.state.params;

  useEffect(() => {
    checkGameStatus();
  }, []);

  const generatePlayUrl = () => {
    const idType = playType === PlayType.match ? "matchPlayId" : "tournamentPlayId";
    return `${gameUrl}?token=${token}&${idType}=${playId}&playType=${playType.name}&durationSecond=${duration}`;
  };

  const onMessage = (event) => {
    console.log(event);
  };

  const onNavigationStateChange = (event) => {
    if (event.canGoBack) {
      closePlayScreen();
    }
  };

  const checkGameStatus = async () => {
    props.gameActions.fetchGamePlayStatus(playType, playId, props.me.subscriber, onGameStatusSuccess, onGameStatusFail);
  };

  const onGameStatusSuccess = (state) => {
    if (state === 1) closePlayScreen();
    else {
      setTimeout(() => {
        checkGameStatus();
      }, 1000);
    }
  };

  const onGameStatusFail = (error) => {
    setTimeout(() => {
      checkGameStatus();
    }, 1000);
  };

  const closePlayScreen = () => {
    onGameEnd();
    /*props.navigation.navigate("GameResultScreen", {
      playId,
      playType,
    });*/
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <KokoStatusBar />
      <WebView source={{ uri: generatePlayUrl() }}
               onMessage={onMessage}
               onNavigationStateChange={onNavigationStateChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayScreen);
