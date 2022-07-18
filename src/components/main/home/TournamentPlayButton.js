import React, { memo, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import LinearGradient from "react-native-linear-gradient";
import shadows from "../../../theme/shadows";
import { getTournamentStatus } from "../../../utils/gameUtils";
import { useTranslation } from "react-i18next";
import "../../../utils/i18n";
import { TournamentStatus } from "../../../consts/gameConfig";

export default memo(({ style, tournamentClass, playableTournament, joinedAlready, onPress }) => {
  const { t } = useTranslation();

  const getStatus = () => {
    return getTournamentStatus(tournamentClass, playableTournament, joinedAlready);
  }

  const getButtonTitle = () => {
    switch (getStatus()) {
      case TournamentStatus.playable:
        return t("game.play_now");
      case TournamentStatus.finished:
        return t("game.finished");
      case TournamentStatus.notStartedYet:
        const startTime = tournamentClass.startTime.length > 0 ? tournamentClass.startTime : t("game.unknown");
        return startTime + " ~";
      case TournamentStatus.full:
        return "test";
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={[defStyle.container, style]} activeOpacity={getStatus() === TournamentStatus.playable ? 0.2 : 1}>
      <LinearGradient style={defStyle.gradient} colors={[getStatus() === TournamentStatus.playable ? '#0038F5' : colors.onBg, getStatus() === TournamentStatus.playable ? '#9F03FF' : colors.onBg]} start={{x: 0.3, y: 0}} end={{x: 0.9, y: 1}}>
        <Text style={defStyle.text}>{getButtonTitle()}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  container: {
    height: hScaleRatio(48),
    borderRadius: 10,
    justifyContent: 'center',
    ...shadows.default
  },
  gradient: {
    height: hScaleRatio(48),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.white,
    fontFamily: "Noto Sans"
  },
});
