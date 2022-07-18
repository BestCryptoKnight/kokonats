import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { hScaleRatio, wScale } from "../utils/scailing";
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from "../theme/colors";

export default memo(({ style, onPress }) => {
  return (
    <TouchableOpacity style={[defStyle.container, style]} onPress={onPress}>
      <FeatherIcon
        name="more-horizontal"
        style={defStyle.icon} />
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: wScale(20),
    width: wScale(40),
    height: hScaleRatio(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: colors.white,
    fontSize: 28
  }
});
