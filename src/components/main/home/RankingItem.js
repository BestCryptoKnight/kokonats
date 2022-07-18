import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import { RankingColors } from "../../../consts/gameConfig";

export default memo(({ style, item, index }) => {

  const backgroundColor = index < 3 ? RankingColors[index] : RankingColors[3];

  return (
    <View style={[defStyle.container, style]}>
      <View style={[defStyle.circle, {backgroundColor: backgroundColor}]}>
        <Text style={defStyle.rank}>{index < 10 ? `0${index + 1}` : (index + 1)}</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={defStyle.points}>{item.score.toLocaleString()}</Text>
        <Text style={defStyle.username}>{item.userName}</Text>
      </View>
    </View>
  );
});

const defStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hScaleRatio(15)
  },
  circle: {
    width: wScale(48),
    height: hScaleRatio(48),
    backgroundColor: colors.pink,
    borderRadius: wScale(24),
    marginRight: wScale(13),
    alignItems: 'center',
    justifyContent: 'center'
  },
  rank: {
    fontFamily: "Noto Sans",
    fontSize: 18,
    fontWeight: '900',
    color: colors.white
  },
  points: {
    fontFamily: "Noto Sans",
    fontWeight: '900',
    fontSize: 28,
    color: colors.white,
    lineHeight: 30
  },
  username: {
    fontFamily: "Noto Sans",
    fontSize: 14,
    color: colors.white,
    lineHeight: 16
  }
});
