import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import Payout from "../../../../assets/images/payout.svg";
import { useTranslation } from "react-i18next";
import "../../../utils/i18n";

export default memo(({ style, content }) => {
  const { t } = useTranslation();

  const getRankingString = rank => {
    if (parseInt(rank) > 3) return rank + t("game.ranking_suf.other");
    else return rank + t("game.ranking_suf." + rank);
  };

  return (
    <View style={[defStyle.container, style]}>
      <View style={defStyle.dot} />
      <Text style={defStyle.text}>{content.startRank === content.endRank ? getRankingString(content.startRank) : (getRankingString(content.startRank) + ' - ' + getRankingString(content.endRank))}</Text>
      <View style={{flex: 1}}/>
      <Payout width={30} height={26} />
      <Text style={defStyle.amount}>+{content.payout}</Text>
    </View>
  );
});

const defStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hScaleRatio(38),
    alignItems: 'center',
  },
  dot: {
    width: wScale(12),
    height: hScaleRatio(12),
    backgroundColor: colors.pink,
    borderRadius: wScale(6),
    marginRight: wScale(10)
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 14,
    color: colors.pink
  },
  amount: {
    fontFamily: "Noto Sans",
    fontWeight: '900',
    fontSize: 28,
    color: colors.yellow,
    marginLeft: wScale(10),
    width: wScale(100)
  }
});
