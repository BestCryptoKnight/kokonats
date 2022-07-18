import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../theme/colors";
import { hScaleRatio, wScale } from "../utils/scailing";
import IoniconsIcon from 'react-native-vector-icons/Ionicons';


export default memo(({ style, onPress }) => {
  return (
    <TouchableOpacity style={[defStyle.wrapper, style]} onPress={onPress}>
      <IoniconsIcon name='settings-sharp' style={defStyle.setting} />
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    borderRadius: wScale(15),
    borderColor: colors.loginColor,
    borderWidth: 1,
    width: wScale(48),
    height: hScaleRatio(48),
    alignItems: 'center',
    justifyContent: 'center'
  },
  setting:{
    color: colors.white,
    fontSize:20,
  }
});
