import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, width, wScale } from "../../../utils/scailing";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import UserAvatar from "../../main/profile/UserAvatar";
import ChatUnreadDot from "../ChatUnreadDot";

export default memo(({ style, thread, unread, myID, onPress }) => {
  const participant = (thread.membersDetail.filter(memberDetail => memberDetail.id !== myID))[0];

  return (
    <TouchableOpacity style={[defStyle.container, style]} onPress={onPress}>
      <UserAvatar avatar={participant.picture} size={48} activeOpacity={1} selected={true} />
      {
        unread > 0 && <ChatUnreadDot style={defStyle.unread} />
      }
      <Text style={defStyle.text}>{participant.userName}</Text>
      <AntDesignIcon
        name="right"
        style={defStyle.right} />
    </TouchableOpacity>
  );
});

const defStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  image: {
    width: wScale(48),
    height: hScaleRatio(48),
    borderRadius: 10
  },
  unread: {
    position: "absolute",
    top: -5,
    left: wScale(33)
  },
  text: {
    fontFamily: "Noto Sans",
    fontWeight: '700',
    fontSize: 14,
    color: colors.white,
    marginLeft: wScale(20),
    flex: 1
  },
  right: {
    fontSize: 14,
    color: colors.loginColor,
  },
});
