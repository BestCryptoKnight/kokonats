import React, { memo, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import { Dropdown } from 'react-native-element-dropdown';

export default memo(({ onPress, data }) => {
  const [value, setValue] = useState("1");

  useEffect(() => {
    onPress(value);
  }, [value]);


  const renderItem = (item) => {
    return (
      <View style={defStyle.item} >
        <Text style={defStyle.text}>{item.label}</Text>
      </View>
    )
  };

  return (
    <Dropdown
      statusBarIsTranslucent={true}
      style={defStyle.dropdown}
      containerStyle={defStyle.containerStyle}
      data={data}
      labelField="label"
      valueField="value"
      maxHeight={hScaleRatio(200)}
      placeholderStyle={defStyle.placeholderStyle}
      selectedTextStyle={defStyle.selectedTextStyle}
      placeholder="  All  "
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      renderItem={renderItem} />
  );
});

const defStyle = StyleSheet.create({
  text: {
    fontFamily: "Noto Sans",
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderRadius: wScale(16),
    borderColor: colors.loginColor,
    borderWidth: 1,
    width: wScale(132),
    height: hScaleRatio(56),
    paddingHorizontal: 10,
    marginLeft: wScale(59)
  },
  containerStyle: {
    backgroundColor: colors.background,
    borderColor: colors.onBg,
  },
  textItem: {
    fontFamily: "Noto Sans",
    fontSize: 12,
    textAlign: 'center'
  },
  item: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.onBg,
    height: hScaleRatio(40)
  },
  selectedTextStyle: {
    color: colors.white,
    fontSize: 12
  },
  placeholderStyle: {
    color: colors.white,
    fontSize: 12
  }
});
