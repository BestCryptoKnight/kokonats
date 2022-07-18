import React, { memo } from "react";
import { StyleSheet, TouchableOpacity,Text } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";

export default memo(({ style,text, onPress }) => {
  return (
    <TouchableOpacity style={[defStyle.wrapper, style]} onPress={onPress}>
      <Text style={defStyle.text}>{text}</Text>
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    borderRadius: wScale(10),
    borderColor: colors.loginColor,
    borderWidth: 1,
    width: wScale(295),
    height: hScaleRatio(48),
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  }
});
