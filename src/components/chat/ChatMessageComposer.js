import React, { memo, useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../theme/colors";
import { hScaleRatio, wScale } from "../../utils/scailing";
import Send from "../../../assets/images/send.svg";

export default memo(({ style, onSend }) => {
  const inputRef = useRef();
  const [input, setInput] = useState("");

  const sendMessage = () => {
    Keyboard.dismiss();
    inputRef.current.clear();
    onSend(input);
  };

  return (
    <View style={[defStyle.container, style]}>
      <TextInput
        ref={inputRef}
        style={defStyle.input}
        underlineColorAndroid="transparent"
        placeholder=""
        placeholderTextColor="rgba(0, 0, 0, 0.3)"
        autoCapitalize="none"
        onChangeText={text => setInput(text)}
      />
      <TouchableOpacity style={defStyle.send} onPress={sendMessage}>
        <Send width={28} height={28} />
      </TouchableOpacity>
    </View>
  );
});

const defStyle = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.background,
    paddingHorizontal: wScale(35),
    paddingVertical: hScaleRatio(15),
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderRadius: wScale(14),
    height: hScaleRatio(38),
    backgroundColor: colors.loginColor,
    paddingHorizontal: wScale(10),
    color: colors.white,
  },
  send: {
    marginLeft: wScale(25),
  },
});
