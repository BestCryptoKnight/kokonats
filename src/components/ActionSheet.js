import React, { memo } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import colors from "../theme/colors";
import { hScaleRatio, wScale } from "../utils/scailing";

export default memo(({ style, actionItems, onCancel }) => {

  const actionSheetItems = [
    ...actionItems,
    {
      label: "Cancel",
      color: colors.blue,
      onPress: onCancel,
    },
  ];

  return (
    <View style={defStyle.container}>
      <View style={[defStyle.modalContent, style]}>
        {
          actionSheetItems.map((actionItem, index) => {
            return (
              <TouchableHighlight
                style={[
                  defStyle.actionSheetView,
                  index === 0 && {
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  },
                  index === actionSheetItems.length - 2 && {
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                  index === actionSheetItems.length - 1 && {
                    borderBottomWidth: 0,
                    backgroundColor: colors.white,
                    marginTop: 8,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  }]}
                underlayColor={"#f7f7f7"}
                key={index} onPress={actionItem.onPress}
              >
                <Text allowFontScaling={false}
                      style={[
                        defStyle.actionSheetText,
                        actionItem.color && {color: actionItem.color}
                      ]}>
                  {actionItem.label}
                </Text>
              </TouchableHighlight>
            );
          })
        }
      </View>
    </View>
  );
});

const defStyle = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  modalContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 10,
  },
  actionSheetText: {
    fontSize: 18,
    color: "rgb(0,98,255)",
  },
  actionSheetView: {
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#DBDBDB",
  },
});
