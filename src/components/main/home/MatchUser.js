import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import { useTranslation } from "react-i18next";
import "../../../utils/i18n";
import UserAvatar from "../profile/UserAvatar";

export default memo(({style, user}) => {
  const { t } = useTranslation();
  return (
    <View style={[defStyle.container, style]}>
      {
        user && <UserAvatar avatar={user.picture} size={90} activeOpacity={1} selected={true} />
      }
      {
        !user && <View style={defStyle.image}/>
      }
      <Text style={defStyle.name}>{user ? user.userName : ""}</Text>
    </View>
  );
});

const defStyle = StyleSheet.create({
  container: {
    width: "100%",
    height: hScaleRatio(240),
    backgroundColor: colors.onBg,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20
  },
  image: {
    width: wScale(90),
    height: hScaleRatio(90),
    borderRadius: 45,
    backgroundColor: colors.background
  },
  name: {
    marginTop: hScaleRatio(24),
    color: colors.white,
    fontSize: 16,
    fontFamily: "Noto Sans",
    fontWeight: "900"
  }
});
