import React, { memo } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import LinearGradient from "react-native-linear-gradient";
import { Avatars } from "../../../consts/config";
import colors from "../../../theme/colors";

export default memo(({ style, avatar, size = 90, selected = false, onPress, activeOpacity = 0.2 }) => {

  return (
    <TouchableOpacity activeOpacity={activeOpacity}
      style={[{
        width: wScale(size),
        height: hScaleRatio(size),
        borderRadius: wScale(size) / 2,
        backgroundColor: selected ? colors.white : 'transparent'
      }, defStyle.container, style]} active={onPress !== undefined} onPress={onPress}>
      <LinearGradient
        style={[defStyle.background, { borderRadius: wScale(size) / 2 }]}
        colors={[selected ? Avatars[avatar].start : 'transparent', selected ? Avatars[avatar].end : 'transparent']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}>
        <Image
          style={{ width: wScale(size - 10), height: hScaleRatio(size - 20) }}
          source={Avatars[avatar].image}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  }
});
