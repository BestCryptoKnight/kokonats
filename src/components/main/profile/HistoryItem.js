import React, { memo, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import Dollar from "../../../../assets/images/dollar.svg";
import GreenStamp from "./GreenStamp";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { convertNumberString } from "../../../utils/stringUtils";

export default memo(({ style, history, onPress }) => {

    const timestamp = () => {
        var timestamp = new Date(history.timestamp);
        var formatted = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit', second: '2-digit' }).format(timestamp);
        return formatted;
    }

    return (
        <TouchableOpacity style={[defStyle.container, style]} onPress={onPress}>
            <GreenStamp balance={'-' + convertNumberString(history.energy)} style={defStyle.greenStamp} />
            <Text style={defStyle.nameText}>{history.tournamentName}</Text>
            <AntDesignIcon name='right' style={defStyle.arrow} />
            {
                history.kokoAmount == "0" ? <View />
                    :
                    <View style={{ flexDirection: 'row', marginTop: hScaleRatio(4), justifyContent: 'space-between' }}>
                        <Dollar width={18} height={18} />
                        <Text style={defStyle.balanceText} >{"+" + convertNumberString(history.kokoAmount.toString())}</Text>
                        <View style={{ flex: 1 }} />
                    </View>
            }

            <Text style={defStyle.infoText}>{timestamp()} vs. {history.matchName}</Text>
        </TouchableOpacity>
    );
});

const defStyle = StyleSheet.create({
    container: {
        height: hScaleRatio(90),
        width: wScale(295),
        paddingHorizontal: wScale(18),
        paddingVertical: hScaleRatio(9),
        backgroundColor: colors.onBg,
        borderRadius: 10,
        justifyContent: 'center',
        position: 'relative'
    },
    nameText: {
        fontFamily: "Noto Sans",
        fontSize: 14,
        color: colors.D8,
        fontWeight: 'bold',
        lineHeight: 22,
    },
    arrow: {
        position: 'absolute',
        right: wScale(11),
        top: hScaleRatio(39),
        fontSize: 14,
        color: colors.loginColor
    },
    infoText: {
        fontFamily: "Noto Sans",
        fontSize: 10,
        color: colors.D8,
        fontWeight: 'bold',
        lineHeight: 22,
    },
    balanceText: {
        fontFamily: "Noto Sans",
        fontSize: 20,
        color: colors.yellow,
        fontWeight: 'bold',
        marginLeft: wScale(8),
        lineHeight: 22,
        justifyContent: 'center'
    },
    greenStamp: {
        position: 'absolute',
        right: wScale(10),
        top: hScaleRatio(8)
    }
});
