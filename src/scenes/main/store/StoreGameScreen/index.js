import React, { useState, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import "../../../../utils/i18n";
import BackButton from "../../../../components/BackButton";
import { getCoinBalance, getPurchasedItems } from "../../../../redux/selectors";
import CoinPanel from "../../../../components/main/CoinPanel";
import GameItemLayout from "../../../../components/main/store/GameItemLayout";
import { getGameItemsList } from "../../../../redux/selectors";
import * as storeActions from "../../../../redux/actions/storeActions"
import KokoStatusBar from "../../../../components/KokoStatusBar";

const StoreGameScreen = props => {
  const { t } = useTranslation();
  const { game } = props.navigation.state.params;

  const onBackPress = () => {
    props.navigation.goBack();
  };

  const renderSeparator = () => {
    return (
      <View style={{ width: 18, height: 18 }} />
    );
  };

  const purchaseItem = (params) => {
    props.storeActions.purchaseItems({
      params: {
        gameItemId: params.id,
        onSuccess: onPurchaseSuccess,
        onFail: onPurchaseFail
      }
    });
  }

  const onPurchaseSuccess = () => {
    console.log("success")
  }

  const onPurchaseFail = (params) => {
    console.log(params)
  }

  return (
    <View style={styles.container}>
      <KokoStatusBar />
      <View style={styles.titleBar}>
        <BackButton onPress={onBackPress} />
        <Text style={styles.title}>{t("store.items")}</Text>
      </View>
      <CoinPanel balance={props.coin} style={styles.coin} />
      <View style={styles.gameContainer}>
        <Image
          style={styles.gameImage}
          source={{ uri: game.coverImageUrl }} />
        <Text
          style={styles.gameTitle}
          numberOfLines={2}
          ellipsizeMode="tail">
          {game.name.length < 80 ? game.name : `${game.name.substring(0, 32)}...`}
        </Text>
      </View>
      <FlatList
        style={{ marginTop: 30, marginLeft: -9 }}
        data={props.items}
        renderItem={({ item }) => (
          < GameItemLayout itemInfo={item} onPress={() => purchaseItem(item)} purchased={false} bean={false} />
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    coin: getCoinBalance(state),
    items: getGameItemsList(state),
    purchasedItems: getPurchasedItems(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeActions: bindActionCreators(storeActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreGameScreen);
