import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import "../../../../utils/i18n";
import styles from "./styles";
import KokoLogo from "../../../../components/main/KokoLogo";
import KokoMarquee from "../../../../components/main/KokoMarquee";
import EnergyDisplay from "../../../../components/main/EnergyDisplay";
import { getEnergyBalance, getGameList } from "../../../../redux/selectors";
import StoreEnergyView from "../../../../components/main/store/StoreEnergyView";
import StoreGameItem from "../../../../components/main/store/StoreGameItem";
import * as storeActions from '../../../../redux/actions/storeActions';

const StoreScreen = props => {
  const { t } = useTranslation();

  const onEnergyPress = () => {
    props.navigation.navigate('StoreEnergyScreen');
  };

  const renderGameItem = (game) => {
    return <StoreGameItem game={game.item} onPress={() => onGameItemPress(game.item)} />;
  };

  const onGameItemPress = (game) => {
    props.storeActions.getGameItems(
      game.id
    );
    props.navigation.navigate('StoreGameScreen', { game: game });
  };

  const renderGameItemSeparator = () => {
    return (
      <View style={styles.gameSeparator} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <KokoLogo />
        <View style={{ flex: 1 }} />
        <EnergyDisplay balance={props.energy}/>
      </View>
      <KokoMarquee style={styles.marquee} text="おめでとうございます! ユーザー名1,000ココ獲得! おめで.." />
      <Text style={styles.title}>{t("store.energy")}</Text>
      <StoreEnergyView style={{ marginBottom: 4 }} onPress={onEnergyPress} />
      <Text style={styles.title}>{t("store.items")}</Text>
      <FlatList
        data={props.games}
        renderItem={renderGameItem}
        ItemSeparatorComponent={renderGameItemSeparator}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    energy: getEnergyBalance(state),
    games: getGameList(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeActions: bindActionCreators(storeActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen);
