import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import colors from "../../theme/colors";
import { hScaleRatio, wScale } from "../../utils/scailing";
import Apple from "../../../assets/images/apple.svg";

export default memo(({ onPress }) => {
  return (
    <TouchableOpacity style={defStyle.wrapper} onPress={onPress}>
      <Apple width={16} height={19} style={defStyle.icon}/>
      <View style={{flex: 1}} />
      <Text style={defStyle.text}>Apple ID でサインインする</Text>
      <View style={{flex: 1}} />
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: wScale(295),
    height: hScaleRatio(48),
    marginHorizontal: wScale(60),
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginLeft: wScale(20)
  },
  text: {
    fontSize: 14,
    color: colors.background,
    fontFamily: "Noto Sans",
  },
});
