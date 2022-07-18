import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../theme/colors";
import Logo from "../../../assets/images/logo.svg";
import { wScale } from "../../utils/scailing";

export default memo(({ style }) => {
  return (
    <View style={[defStyle.container, style]}>
      <Logo width={35} height={36} />
      <Text style={defStyle.text}>KOKO</Text>
    </View>

  );
});

const defStyle = StyleSheet.create({
  container: {
    height: "auto",
    width: "auto",
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 36,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: wScale(7)
  },
});
