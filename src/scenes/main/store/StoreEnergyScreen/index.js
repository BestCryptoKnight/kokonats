import React, { useState, useEffect } from "react";
import { Text, View, Platform, FlatList, Linking } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import BackButton from "../../../../components/BackButton";
import { useTranslation } from "react-i18next";
import "../../../../utils/i18n";
import { getEnergyBalance } from "../../../../redux/selectors";
import StoreEnergyStatus from "../../../../components/main/store/StoreEnergyStatus";
import StoreEnergyAndroidCard from "../../../../components/main/store/StoreEnergyAndroidCard";
import EnergyItemLayout from "../../../../components/main/store/EnergyItemLayout";
import Clipboard from "@react-native-clipboard/clipboard";
import { GAME_LINK } from "../../../../consts/config";
import KokoStatusBar from "../../../../components/KokoStatusBar";
import { energies_ios } from "../../../../consts/storeConfig";
import {requestPurchase, requestSubscription, useIAP} from 'react-native-iap';
import { Purchase } from "react-native-iap";
import * as storeActions from "../../../../redux/actions/storeActions";

const StoreEnergyScreen = props => {

  const { t } = useTranslation();
  const iapSkus = energies_ios.map(product => product.identifier);
  const {
    connected,
    products,
    subscriptions,
    getProducts,
    getSubscriptions,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  useEffect(() => {
    if (connected) {
      getProducts(iapSkus);
    }
  }, [connected, getProducts]);

  useEffect(() => {
    const checkCurrentPurchase = async (purchase?: Purchase): Promise<void> => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;
        if (receipt)
          try {
            const ackResult = await finishTransaction(purchase);
            console.log('ackResult', ackResult);
            props.storeActions.purchaseEnergy(receipt, purchase.transactionId);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  const onBackPress = () => {
    props.navigation.goBack();
  };

  const renderSeparator = () => {
    return (
      <View style={{ width: 18, height: 18 }} />
    );
  };

  const onPressAndroidCard = async () => {
    await Linking.canOpenURL(GAME_LINK);
    Linking.openURL(GAME_LINK);
  };

  const onCopyLink = () => {
    Clipboard.setString(GAME_LINK);
  };

  const purchaseEnergy = (product) => {
    requestPurchase(product.identifier);
  };

  return (
    <View style={styles.container}>
      <KokoStatusBar />
      <View style={styles.titleBar}>
        <BackButton onPress={onBackPress} />
        <Text style={styles.title}>{t("store.energy")}</Text>
      </View>
      <StoreEnergyStatus balance={props.energy} style={styles.energy} />
      {Platform.OS === 'android' ?
        <StoreEnergyAndroidCard style={styles.androidCard} onPress={onPressAndroidCard} onCopyLink={onCopyLink} />
        : <FlatList
          style={{ marginTop: 30, marginLeft: -9 }}
          data={energies_ios}
          renderItem={({ item }) => (
            <EnergyItemLayout product={item} onPress={() => purchaseEnergy(item)}/>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={renderSeparator}
        />
      }
    </View>

  );
};

const mapStateToProps = state => {
  return {
    energy: getEnergyBalance(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeActions: bindActionCreators(storeActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreEnergyScreen);
