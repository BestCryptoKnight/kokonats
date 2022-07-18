import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import shadows from "../../../theme/shadows";

export default memo(({ style, game, index, onPress }) => {

  return (
    <TouchableOpacity style={[defStyle.container, style, {marginLeft: index === 0 ? wScale(24) : 0}]} onPress={onPress}>
      <Image style={defStyle.image} source={{uri: game.coverImageUrl}} />
      <Text style={defStyle.text}>{game.name}</Text>
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  container: {
    width: wScale(255),
    height: hScaleRatio(188),
    flexDirection: 'column',
    backgroundColor: colors.onBg,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: hScaleRatio(16),
    ...shadows.default
  },
  image: {
    width: wScale(255),
    height: hScaleRatio(150),
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  text: {
    fontFamily: "Noto Sans",
    fontWeight: '800',
    fontSize: 16,
    color: colors.white,
    lineHeight: 30,
  }
});
