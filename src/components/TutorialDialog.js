import React, { memo, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, Image, View } from "react-native";
import colors from "../theme/colors";
import { hScaleRatio, wScale } from "../utils/scailing";
import shadows from "../theme/shadows";
import OcticonIcon from 'react-native-vector-icons/Octicons';
import Energy from "../../assets/images/energy.svg";
import Dollar from "../../assets/images/dollar.svg";
import { useTranslation } from "react-i18next";
import "../utils/i18n";

export default memo(({ style, onGetStarted }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const onPrevStep = () => {
    setStep(step - 1);
  };

  const onNextStep = () => {
    setStep(step + 1);
  };

  return (
    <View style={[defStyle.container, style]}>
      <View style={defStyle.modal}>
        {
          step === 0 && (<Image source={require('../../assets/images/tutorial_1.png')} style={defStyle.background} />)
        }
        {
          step === 1 && (<Image source={require('../../assets/images/tutorial_2.png')} style={defStyle.background} />)
        }
        {
          step === 2 && (<Image source={require('../../assets/images/tutorial_3.png')} style={defStyle.background} />)
        }
        {
          step === 0 && (
            <View style={defStyle.contentContainer}>
              <Energy width={37} height={80} />
              <Image source={require('../../assets/images/tutorial_energy.png')} style={defStyle.contentImage} />
              <Text style={defStyle.contentText}>{t('tutorial.guide_1')}</Text>
            </View>
          )
        }
        {
          step === 1 && (
            <View style={defStyle.contentContainer}>
              <Dollar width={80} height={80} />
              <Image source={require('../../assets/images/tutorial_coin.png')} style={defStyle.contentImage} />
              <Text style={defStyle.contentText}>{t('tutorial.guide_2')}</Text>
            </View>
          )
        }
        {
          step === 2 && (
            <View style={defStyle.contentContainer}>
              <Image source={require('../../assets/images/gold.png')} style={{width: wScale(134), height: hScaleRatio(115)}} />
              <Text style={defStyle.contentText}>{t('tutorial.guide_3')}</Text>
              <TouchableOpacity onPress={onGetStarted}>
                <Text style={defStyle.startText}>{t('tutorial.tap_to_start')}</Text>
              </TouchableOpacity>
            </View>
          )
        }
        <View style={defStyle.stepContainer}>
          {
            step > 0 && <TouchableOpacity style={defStyle.stepArrow} onPress={onPrevStep}>
              <OcticonIcon
                name='chevron-left'
                style={defStyle.stepIcon} />
            </TouchableOpacity>
          }
          {
            step === 0 && <View style={{width: 26}}/>
          }
          <Text style={defStyle.step}>{(step + 1)}/3</Text>
          {
            step < 2 && <TouchableOpacity style={defStyle.stepArrow} onPress={onNextStep}>
              <OcticonIcon
                name='chevron-right'
                style={defStyle.stepIcon} />
            </TouchableOpacity>
          }
          {
            step === 2 && <View style={{width: 26}}/>
          }
        </View>
      </View>
    </View>
  );
});

const defStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    borderRadius: wScale(20),
    width: wScale(340),
    height: hScaleRatio(570),
    backgroundColor: colors.white,
    ...shadows.default
  },
  background: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hScaleRatio(50)
  },
  contentImage: {
    marginTop: hScaleRatio(20)
  },
  contentText: {
    fontFamily: "Noto Sans",
    fontSize: 20,
    textAlign: 'center',
    color: colors.background,
    marginTop: hScaleRatio(24)
  },
  startText: {
    fontFamily: "Noto Sans",
    fontSize: 20,
    textAlign: 'center',
    color: colors.blue,
    marginTop: hScaleRatio(24)
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wScale(280),
    position: 'absolute',
    bottom: hScaleRatio(40),
    left: wScale(30),
    alignItems: 'center'
  },
  stepArrow: {
    padding: wScale(10),
  },
  stepIcon: {
    fontSize: 20,
    color: colors.blue
  },
  step: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 20
  }
});
