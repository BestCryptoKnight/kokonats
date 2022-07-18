import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../theme/colors";
import Energy from "../../../assets/images/energy.svg";
import PlusCircle from "../../../assets/images/plus-circle.svg";
import { hScaleRatio, wScale } from "../../utils/scailing";

export default memo(({ style, balance, onPress }) => {
  return (
    <TouchableOpacity style={[defStyle.container, style]} onPress={onPress}>
      <Energy width={16} height={30}/>
      <Text style={defStyle.text}>{balance.toLocaleString()}</Text>
      <View style={{flex: 1}} />
      <PlusCircle width={24} height={24}/>
    </TouchableOpacity>

  );
});

const defStyle = StyleSheet.create({
  container: {
    height: hScaleRatio(60),
    width: wScale(295),
    flexDirection: "row",
    alignItems:'center',
    paddingHorizontal: wScale(15),
    paddingVertical: hScaleRatio(7),
    backgroundColor: colors.onBg,
    borderRadius: 20
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
    lineHeight: 25,
    marginLeft: wScale(12)
  }
});
