import React, { memo } from "react";
import { StyleSheet, View,Text } from "react-native";
import colors from "../../../theme/colors";
import Energy from "../../../../assets/images/energy.svg";
import { hScaleRatio, wScale } from "../../../utils/scailing";

export default memo(({ style, balance }) => {
    return (
        <View style={[defStyle.container, style]}>
            <Energy style={defStyle.energy} width={8} height={14} />
            <Text style={defStyle.text}>{balance}</Text>
        </View>


    );
});

const defStyle = StyleSheet.create({
    container: {
        width: "auto",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(79,198,185,0.1)",
        borderRadius: 10,
        paddingHorizontal: 5
    },
    energy: {
        marginTop: 3
    },
    text: {
        fontFamily: "Noto Sans",
        fontSize: 12,
        color: colors.greenStamp,
        fontWeight: '700',
        lineHeight: 22,
        paddingHorizontal: 3
    },
});
