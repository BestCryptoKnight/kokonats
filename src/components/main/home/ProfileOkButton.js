import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import LinearGradient from "react-native-linear-gradient";
import shadows from "../../../theme/shadows";

export default memo(({ style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}  style={[defStyle.container, style]}>
      <LinearGradient style={defStyle.gradient} colors={['#0038F5', '#9F03FF']} start={{x: 0.3, y: 0}} end={{x: 0.9, y: 1}}>
        <Text style={defStyle.text}>OK</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  container: {
    width:wScale(135),
    height: hScaleRatio(48),
    borderRadius: 10,
    justifyContent: 'center',
    ...shadows.default
  },
  gradient: {
    height: hScaleRatio(48),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.white,
    fontFamily: "Noto Sans"
  },
});
