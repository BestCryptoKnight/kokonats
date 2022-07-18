import React, { memo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../../../theme/colors";
import UserAvatar from "../../../components/main/profile/UserAvatar"
import { hScaleRatio, wScale } from "../../../utils/scailing";
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";

export default memo(({ style, user, onMore }) => {
    const timestamp = new Date(user.createTime);

    return (
        <View style={[defStyle.container, style]}>
            <UserAvatar avatar={user.picture} selected={true} size={51} activeOpacity={1} />
            <View style={{ flexDirection: 'column', marginLeft: wScale(12) }}>
                <Text style={defStyle.userName}>{user.username}</Text>
                <Text style={defStyle.userData}>{moment(timestamp).format("yyyy/MM/DD")}</Text>
            </View>
            <TouchableOpacity style={{ width: wScale(40), height: hScaleRatio(40), justifyContent: 'center' }} onPress={onMore}>
                <Ionicons name='ios-ellipsis-horizontal' style={defStyle.ellipse} />
            </TouchableOpacity>
        </View>
    );
});

const defStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center'
    },
    userName: {
        fontFamily: "Noto Sans",
        fontSize: 20,
        color: colors.white,
        fontWeight: '900',
        lineHeight: 24,
        width: wScale(190)
    },
    ellipse: {
        fontSize: 14,
        color: colors.D9
    },
    userData: {
        fontFamily: "Noto Sans",
        fontSize: 14,
        color: colors.white,
        fontWeight: '400',
        lineHeight: 20,
    }
});
