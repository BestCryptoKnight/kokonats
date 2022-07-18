import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import Upload from "../../../../assets/images/upload.svg";

export default memo(({ style, onPress }) => {
  return (
    <TouchableOpacity style={[defStyle.container, style]} onPress={onPress}>
      <Upload width={20} height={20} />
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.onBg,
    borderRadius: wScale(20),
    width: wScale(40),
    height: hScaleRatio(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
});
