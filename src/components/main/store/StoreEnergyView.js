import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import Energy from "../../../../assets/images/energy.svg";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import shadows from "../../../theme/shadows";
import {useTranslation} from 'react-i18next';
import '../../../utils/i18n';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export default memo(({ style, onPress }) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity style={[defStyle.container, style]} onPress={onPress}>
      <View style={defStyle.energyContainer}>
        <Energy width={21} height={40} />
      </View>
      <Text style={defStyle.text}>{t('store.buy_energy')}</Text>
      <View style={{flex: 1}} />
      <AntDesignIcon
        name='right'
        style={defStyle.right} />
    </TouchableOpacity>

  );
});

const defStyle = StyleSheet.create({
  container: {
    height: hScaleRatio(90),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wScale(16),
    paddingVertical: hScaleRatio(15),
    backgroundColor: colors.onBg,
    borderRadius: 10,
    ...shadows.default
  },
  energyContainer: {
    width: wScale(60),
    height: hScaleRatio(60),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 203, 0, 0.1)',
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 20,
    color: colors.yellow,
    fontWeight: 'bold',
    marginLeft: wScale(23),
    lineHeight: 22,
  },
  right: {
    fontSize: 20,
    color: colors.loginColor
  }
});
