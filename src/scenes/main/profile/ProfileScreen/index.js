import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux"
import { ScrollView, Text, View } from "react-native";
import EventBus from 'react-native-event-bus'
import { connect } from "react-redux";
import styles from "./styles";
import { useTranslation } from 'react-i18next';
import '../../../../utils/i18n';
import { GO_TO_HOME, GO_TO_STORE } from "../../../../events/types";
import CoinPanel from "../../../../components/main/CoinPanel";
import EnergyPanel from "../../../../components/main/EnergyPanel";
import HistoryItem from "../../../../components/main/profile/HistoryItem";
import InfoButton from "../../../../components/main/profile/InfoButton";
import LogoutButton from "../../../../components/LogoutButton";
import SettingButton from "../../../../components/SettingButton";
import { getEnergyBalance, getCoinBalance, getUserInfo, getUserTnmtHistory } from "../../../../redux/selectors";
import UserAvatar from "../../../../components/main/profile/UserAvatar";
import * as authActions from "../../../../redux/actions/authActions";
import auth from "@react-native-firebase/auth";


const ProfileScreen = props => {
  const { t } = useTranslation();

  const onEnergyPress = () => {
    EventBus.getInstance().fireEvent(GO_TO_STORE);
  };

  const onLogoutPress = async () => {
    await auth().signOut();
    props.authActions.signOut({onSuccess: onLogoutSuccess, onFail: onLogoutFail});
  };

  const onLogoutSuccess = () => {
    EventBus.getInstance().fireEvent(GO_TO_HOME);
  };

  const onLogoutFail = () => {

  };

  const onSettingPress = () => {
    props.navigation.navigate('ProfileEditScreen');
  };

  const onMoreDetail = () => {
    props.navigation.navigate('HistoryScreen');
  };

  const onWhenTrouble = () => {
  };

  const onBlockList = () => {
    props.navigation.navigate('BlockListScreen');
  };

  const onCoinPress = () => {
    //EventBus.getInstance().fireEvent(GO_TO_STORE)
  };

  return (
    <ScrollView style={styles.container}>
      <LogoutButton onPress={onLogoutPress} style={styles.logout} />
      <View style={styles.contentContainer}>
        <View style={styles.avatar} >
          {
            props.userInfo.picture && <UserAvatar avatar={props.userInfo.picture} activeOpacity={1} selected={true} />
          }
          <SettingButton onPress={onSettingPress} style={styles.setting} />
        </View>
        <Text style={styles.uid}>UID: {props.userInfo.id}</Text>
        <Text style={styles.name}> {props.userInfo.userName}</Text>
        <CoinPanel style={styles.coinPanel} balance={props.coin} onPress={onCoinPress} />
        <EnergyPanel style={styles.energyPanel} balance={props.energy} onPress={onEnergyPress} />
        <Text style={styles.history}>{t("profile.tournament_history_1")}</Text>
        {props.userHistory && props.userHistory.map((tnmtHistory, index) =>
          (<HistoryItem style={styles.historyItem} history={tnmtHistory} />))}
        <InfoButton style={styles.infoButton} text={t('profile.see_more')} onPress={onMoreDetail} />
        <InfoButton style={styles.infoButton} text={t('profile.click_here_trouble')} onPress={onWhenTrouble} />
        <InfoButton style={styles.infoButton} text={t('profile.blockList')} onPress={onBlockList} />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    energy: getEnergyBalance(state),
    coin: getCoinBalance(state),
    userInfo: getUserInfo(state),
    userHistory: getUserTnmtHistory(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
