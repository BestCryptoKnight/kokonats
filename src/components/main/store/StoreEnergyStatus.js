import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../theme/colors";
import Energy from "../../../../assets/images/energy.svg";
import { hScaleRatio, wScale } from "../../../utils/scailing";

export default memo(({ style, balance}) => {
  return (
    <View style={[defStyle.container, style]}>
      <Energy width={21} height={40} style = {defStyle.energy} />
      <View style={{flex: 1}} />
      <Text style={defStyle.text}>{balance.toLocaleString()}</Text>
      <View style={{flex: 1}} />
    </View>

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
    backgroundColor: colors.energyBg,
    borderRadius: 20
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 28,
    color: colors.white,
    fontWeight: 'bold',
  },
});
