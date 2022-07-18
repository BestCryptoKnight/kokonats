import React, { memo } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import { hScaleRatio, wScale } from "../../utils/scailing";

export default memo(({ image, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={defStyle.image}
        source={image}
        tintColor={isSelected ? colors.white : colors.unselectedItemColor}
      />
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  image: {
    height: wScale(24),
    width: hScaleRatio(24),
    margin: wScale(16),
  },
});
