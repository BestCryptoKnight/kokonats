import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import { hScaleRatio, width, wScale } from "../../utils/scailing";
import { useTranslation } from "react-i18next";
import "../../utils/i18n";
import dimensions from "../../theme/dimensions";
import ChatUnreadDot from "./ChatUnreadDot";

export default memo(({ style, type, selected, unread, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={[defStyle.container, style, {backgroundColor: selected ? colors.chatYellow : colors.gray2}]} onPress={onPress}>
      <Text style={defStyle.text}>{t(type.translate)}</Text>
      {
        unread > 0 && <ChatUnreadDot style={defStyle.unreadDot} />
      }
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  container: {
    width: (width - dimensions.paddingHPrimary * 2 - wScale(10) * 2) / 3,
    height: hScaleRatio(38),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
    borderRadius: wScale(14),
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 17,
    color: colors.white,
    lineHeight: 20,
  },
  unreadDot: {
    position: "absolute",
    top: -5,
    right: -8
  }
});
