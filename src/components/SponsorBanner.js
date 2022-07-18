import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import colors from "../theme/colors";
import { hScaleRatio, wScale } from "../utils/scailing";

export default memo(({ style, onPress }) => {
  return (
    <TouchableOpacity style={[defStyle.container, style]} onPress={onPress}>
      <Image style={defStyle.image} source={require('../../assets/images/sponsor_banner.png')} />
      <Text style={defStyle.text}>Supported By Cloud7</Text>
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  container: {
    borderRadius: wScale(10),
    width: wScale(297),
    height: hScaleRatio(60),
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  text:{
    fontFamily: "Noto Sans",
    fontSize: 14,
    textAlign: 'center',
    color: colors.black,
    backgroundColor: colors.white,
    paddingHorizontal: wScale(10),
    paddingVertical: hScaleRatio(5),
    lineHeight: 16
  }
});
