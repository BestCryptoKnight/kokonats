import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import { useTranslation } from "react-i18next";
import "../../../utils/i18n";

export default memo(({ style, tag, index, selected, onPress, startPadding = 24 }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={[defStyle.container, style, {marginLeft: index === 0 ? wScale(startPadding) : 0, backgroundColor: selected ? colors.blue : colors.onBg}]} onPress={onPress}>
      <Text style={defStyle.text}>{tag === '_all_' ? t('home.all') : tag}</Text>
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  container: {
    height: hScaleRatio(38),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wScale(16),
    paddingVertical: hScaleRatio(8),
    backgroundColor: colors.blue,
    borderRadius: 20,
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 17,
    color: colors.white,
    lineHeight: 20,
  }
});
