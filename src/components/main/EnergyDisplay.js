import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import Energy from "../../../assets/images/energy.svg";
import PlusCircle from "../../../assets/images/plus-circle.svg";
import { hScaleRatio, wScale } from "../../utils/scailing";

export default memo(({ style, balance, onPress }) => {
  return (
    <TouchableOpacity style={[defStyle.container, style]} onPress={onPress}>
      <Energy width={9} height={16} />
      <Text style={defStyle.text}>{balance.toLocaleString()}</Text>
      <PlusCircle width={20} height={20} />
    </TouchableOpacity>

  );
});

const defStyle = StyleSheet.create({
  container: {
    height: hScaleRatio(30),
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wScale(5),
    paddingVertical: hScaleRatio(7),
    backgroundColor: colors.energyBg,
    borderRadius: 10
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: wScale(4),
    marginRight: wScale(24),
    lineHeight: 16,
  },
});
