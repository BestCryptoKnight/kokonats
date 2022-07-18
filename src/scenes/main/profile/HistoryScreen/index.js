import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import "../../../../utils/i18n";
import { useTranslation } from "react-i18next";
import BackButton from "../../../../components/BackButton";
import DropDownButton from "../../../../components/main/profile/DropDownButton";
import Dollar from "../../../../../assets/images/dollar.svg";
import HistoryItem from "../../../../components/main/profile/HistoryItem";
import { getUserInfo, getCoinBalance, getUserTnmtHistory, getHistoryTags } from "../../../../redux/selectors";
import * as gameActions from "../../../../redux/actions/gameActions"
import { convertNumberString } from "../../../../utils/stringUtils";

const HistoryScreen = props => {
  const { t } = useTranslation();
  const [rankings, setRankings] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState(props.userHistory);

  const data = getHistoryTags(props.userHistory);

  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onDropDownPress = (params) => {
    const tnmtHistory = props.userHistory;
    if (params == 1) {
      setFilteredHistory(tnmtHistory);
    }
    else {
      setFilteredHistory(tnmtHistory.filter(item => item.tournamentName.substring(0, 4) == data[params - 1].label.substring(0, 4)));
    }
  }

  const getTotalAmount = () => {
    var totalAmount = 0;
    props.userHistory.map((item) => totalAmount += item.kokoAmount)
    return totalAmount
  }

  const onPlayAgain = () => {

    props.navigation.goBack()
  }

  const onRankingFetched = (data) => {
    console.log(data)
    props.navigation.navigate("GameResultScreen", {
      result: data,
      onPlayAgain: onPlayAgain
    });
  };

  const onRankingFailed = (error) => {
  };

  const onHistoryItemPress = (tournamentId) => {
    props.gameActions.fetchTournamentRanking(
      tournamentId,
      (data) => onRankingFetched(data),
      (error) => onRankingFailed(error));
  }

  return (
    <ScrollView style={styles.container}>
      <BackButton onPress={onBackPress} style={styles.backButton} />
      <Text style={styles.title}>{t("profile.tournament_history")}</Text>
      <View style={styles.filterContainer}>
        <DropDownButton onPress={onDropDownPress} data={data} />
        <View style={styles.totalContainer}>
          <Text style={styles.text}>合計</Text>
          <View style={styles.totalValueContainer}>
            <Dollar width={18} height={18} />
            <Text style={styles.dollarText}>{"+" + convertNumberString(getTotalAmount())}</Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        {filteredHistory.map((history) =>
          (<HistoryItem style={styles.historyItem} history={history} onPress={() => onHistoryItemPress(history.tournamentId)} />))}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    coin: getCoinBalance(state),
    userInfo: getUserInfo(state),
    userHistory: getUserTnmtHistory(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    gameActions: bindActionCreators(gameActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
