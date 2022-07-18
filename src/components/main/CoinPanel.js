import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import Dollar from "../../../assets/images/dollar.svg";
import { hScaleRatio, wScale } from "../../utils/scailing";

export default memo(({ style, balance, onPress }) => {
  return (
    <TouchableOpacity style={[defStyle.container, style]} onPress={onPress}>
      <Dollar width={40} height={40}/>
      <Text style={defStyle.text}>{balance.toLocaleString()}</Text>
    </TouchableOpacity>

  );
});

const defStyle = StyleSheet.create({
  container: {
    height: hScaleRatio(60),
    width: wScale(295),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wScale(15),
    paddingVertical: hScaleRatio(7),
    backgroundColor: colors.coinYellow,
    borderRadius: 20,
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 28,
    color: colors.white,
    fontWeight: 'bold',
    flex: 1,
    textAlign: "center",
    marginRight: wScale(20)
  }
});
