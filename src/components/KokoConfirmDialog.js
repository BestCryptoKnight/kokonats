import React, { memo, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";
import { hScaleRatio, wScale } from "../utils/scailing";
import shadows from "../theme/shadows";
import { useTranslation } from "react-i18next";
import "../utils/i18n";
import { ConfirmDialogType } from "../consts/config";
import Attention from "../../assets/images/dialog_attention.svg";
import Check from "../../assets/images/dialog_check.svg";
import Close from "../../assets/images/dialog_close.svg";
import Info from "../../assets/images/dialog_info.svg";
import Lamp from "../../assets/images/dialog_lamp.svg";
import Question from "../../assets/images/dialog_question.svg";
import LinearGradient from "react-native-linear-gradient";

export default memo(({
                       style,
                       visible,
                       type = ConfirmDialogType.question,
                       title,
                       message,
                       textOK,
                       textCancel,
                       onOk,
                       onCancel,
                     }) => {
  const { t } = useTranslation();

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={[defStyle.container, style]}>
        <View style={defStyle.modal}>
          {
            type === ConfirmDialogType.attention && <Attention width={50} height={50} />
          }
          {
            type === ConfirmDialogType.check && <Check width={50} height={50} />
          }
          {
            type === ConfirmDialogType.close && <Close width={50} height={50} />
          }
          {
            type === ConfirmDialogType.info && <Info width={50} height={50} />
          }
          {
            type === ConfirmDialogType.lamp && <Lamp width={50} height={50} />
          }
          {
            type === ConfirmDialogType.question && <Question width={50} height={50} />
          }
          <Text style={defStyle.title}>{title ?? t("dialog.def_title")}</Text>
          <Text style={defStyle.message}>{message ?? t("dialog.def_message")}</Text>
          <View style={defStyle.buttonContainer}>
            <TouchableOpacity style={defStyle.button} onPress={onCancel}>
              <Text style={defStyle.buttonText}>{textCancel ?? t("dialog.def_cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[defStyle.button, defStyle.okButton]} onPress={onOk}>
              <LinearGradient style={defStyle.gradient} colors={['#0038F5', '#9F03FF']} start={{x: 0.3, y: 0}} end={{x: 0.9, y: 1}}>
                <Text style={defStyle.buttonText}>{textOK ?? t("dialog.def_ok")}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const defStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    borderRadius: wScale(10),
    width: wScale(295),
    paddingHorizontal: wScale(20),
    paddingVertical: hScaleRatio(36),
    alignItems: "center",
    backgroundColor: colors.white,
    ...shadows.default,
  },
  title: {
    color: colors.black,
    fontSize: 20,
    fontFamily: "Noto Sans",
    fontWeight: "900",
    marginTop: hScaleRatio(16),
    textAlign: "center"
  },
  message: {
    color: colors.black,
    fontSize: 14,
    fontFamily: "Noto Sans",
    fontWeight: "400",
    marginTop: hScaleRatio(10),
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: hScaleRatio(25)
  },
  button: {
    width: wScale(100),
    height: hScaleRatio(48),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wScale(10),
    backgroundColor: colors.onBg
  },
  okButton: {
    marginLeft: wScale(20)
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: wScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Noto Sans",
    fontSize: 14,
    fontWeight: "700",
    color: colors.white
  }
});
