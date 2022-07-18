import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../theme/colors";
import { hScaleRatio, width, wScale } from "../../utils/scailing";
import shadows from "../../theme/shadows";

export default memo(({ style, type, selected, onPress }) => {

  return (
    <View style={[defStyle.container, style]}/>
  );
});

const defStyle = StyleSheet.create({
  container: {
    width: wScale(20),
    height: hScaleRatio(20),
    borderRadius: wScale(10),
    backgroundColor: colors.chatYellow,
    ...shadows.default
  }
});
