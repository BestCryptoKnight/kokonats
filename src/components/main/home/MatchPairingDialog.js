import React, { memo } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import colors from "../../../theme/colors";
import { useTranslation } from "react-i18next";
import "../../../utils/i18n";
import dimensions from "../../../theme/dimensions";
import MatchUser from "./MatchUser";

export default memo(({style, visible, user, opponents}) => {
  const { t } = useTranslation();
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={[defStyle.container, style]}>
        <View style={{flex: 2}}/>
        <Text style={defStyle.title}>{t("game.matching")}</Text>
        <View style={{flex: 1}}/>
        <MatchUser style={defStyle.me} user={user}/>
        <View style={{flex: 1}}/>
        <Text style={defStyle.vs}>Vs.</Text>
        <View style={{flex: 1}}/>
        <MatchUser user={opponents.length > 0 ? opponents[0] : null}/>
        <View style={{flex: 1}}/>
      </View>
    </Modal>
  );
});

const defStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: dimensions.paddingHSecondary
  },
  title: {
    fontFamily: "Noto Sans",
    fontSize: 34,
    color: colors.white,
  },
  me: {
  },
  vs: {
    color: colors.white,
    textAlign: "center",
    fontFamily: "Noto Sans",
    fontWeight: "900",
    fontSize: 16
  }
});
