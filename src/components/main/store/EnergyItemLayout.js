import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, width, wScale } from "../../../utils/scailing";
import shadows from "../../../theme/shadows";
import { useTranslation } from "react-i18next";
import "../../../utils/i18n";
import Energy from "../../../../assets/images/energy.svg";
import { ENERGY_PURCHASE_RECOMMENDED } from "../../../consts/storeConfig";

export default memo(({ product, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={defStyle.container} onPress={onPress}>
      {product.price === ENERGY_PURCHASE_RECOMMENDED ? <View style={defStyle.recommend}>
          <Text style={defStyle.recommendText}>{t('store.recommend')}</Text>
        </View>
        : <View style={{ height: hScaleRatio(21) }} />}
      <View style={defStyle.energyBack}>
        <Energy width={21} height={40} />
      </View>
      <Text style={defStyle.energy}>+{product.energy.toLocaleString()}</Text>
      <Text style={[product.price === ENERGY_PURCHASE_RECOMMENDED ? { color: colors.recommend } : { color: colors.white }, defStyle.cost]}>¥{product.price.toLocaleString()}</Text>
    </TouchableOpacity>

  );
});

const defStyle = StyleSheet.create({
  container: {
    width: (width - wScale(42) * 2) / 3,
    height: hScaleRatio(140),
    alignItems: "center",
    backgroundColor: colors.onBg,
    borderRadius: 10,
    marginHorizontal: 9,
    ...shadows.default,
  },
  energyBack: {
    flexDirection: 'row',
    padding: wScale(21),
    width: wScale(60),
    height: hScaleRatio(60),
    backgroundColor: colors.energyBg,
    borderRadius: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 18,
    color: colors.white,
    lineHeight: 20,
    marginTop: hScaleRatio(20)
  },
  recommend: {
    width: '100%',
    height: hScaleRatio(21),
    backgroundColor: colors.recommend,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center'
  },
  recommendText: {
    fontFamily: "Noto Sans",
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 16,
  },
  energy: {
    fontFamily: "Noto Sans",
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 19,
    marginTop: hScaleRatio(4)
  },
  cost: {
    fontFamily: "Noto Sans",
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
  },
  discount: {
    position: 'absolute',
    left: wScale(30),
    top: hScaleRatio(34),
    color: colors.white,
    fontFamily: "Noto Sans",
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  }
});
