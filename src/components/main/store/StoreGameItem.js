import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import shadows from "../../../theme/shadows";
import { useTranslation } from "react-i18next";
import "../../../utils/i18n";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

export default memo(({ style, game, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={[defStyle.container, style]} onPress={onPress}>
      <Image
        style={defStyle.image}
        source={{ uri: game.coverImageUrl }} />
      <Text
        style={defStyle.text}
        numberOfLines={2}
        ellipsizeMode="tail">
        {game.name.length < 80 ? game.name : `${game.name.substring(0, 32)}...`}
      </Text>
      <View style={{ flex: 1 }} />
      <AntDesignIcon
        name="right"
        style={defStyle.right} />
    </TouchableOpacity>

  );
});

const defStyle = StyleSheet.create({
  container: {
    height: hScaleRatio(90),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wScale(11),
    paddingVertical: hScaleRatio(10),
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    ...shadows.default,
  },
  image: {
    width: wScale(70),
    height: hScaleRatio(70),
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 18,
    color: colors.background,
    marginLeft: wScale(18),
    lineHeight: 20,
  },
  right: {
    fontSize: 20,
    color: colors.loginColor,
  },
});
