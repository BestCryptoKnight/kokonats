import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Back from "../../../assets/images/back.svg";
import colors from "../../theme/colors";
import { hScaleRatio, wScale } from "../../utils/scailing";

export default memo(({ style, onPress }) => {
  return (
    <TouchableOpacity style={[defStyle.container, style]} onPress={onPress}>
      <Back width={24} height={24}/>
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(196, 196, 196, 0.3)',
    borderRadius: wScale(20),
    width: wScale(40),
    height: hScaleRatio(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
});
