import { StyleSheet } from "react-native";
import colors from "../../../../theme/colors";
import { hScaleRatio, width, wScale } from "../../../../utils/scailing";
import dimensions from "../../../../theme/dimensions";
import shadows from "../../../../theme/shadows";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: dimensions.paddingHSecondary
  },
  appbarContainer: {
    flexDirection: 'row',
    marginTop: dimensions.paddingTop,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverContainer: {
    width: width - 104,
    height: width - 104,
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  coverGradient: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  name: {
    fontFamily: "Noto Sans",
    fontWeight: '700',
    fontSize: 20,
    color: colors.white,
    position: 'absolute',
    bottom: 12,
    left: 12
  },
  share: {
    position: 'absolute',
    top: 12,
    right: 12
  },
  play: {
    marginTop: hScaleRatio(20),
    height: hScaleRatio(48),
    borderRadius: 10,
    justifyContent: 'center',
    ...shadows.default
  },
  gradient: {
    height: hScaleRatio(48),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: "Noto Sans"
  },
  description: {
    marginTop: hScaleRatio(20),
    color: colors.white,
    fontSize: 14
  },
  sponsor: {
    marginVertical: hScaleRatio(25),
  },
  rule: {
    fontFamily: "Noto Sans",
    fontWeight: '900',
    fontSize: 14,
    color: colors.white,
  },
  ruleContainer: {
    flexDirection: 'row',
    height: hScaleRatio(38),
    alignItems: 'center',
    marginBottom: hScaleRatio(30)
  },
  winner: {
    fontFamily: "Noto Sans",
    fontSize: 14,
    color: colors.pink
  },
  payout: {
    fontFamily: "Noto Sans",
    fontWeight: '900',
    fontSize: 28,
    color: colors.yellow,
    marginLeft: wScale(10),
  }
});

export default styles;
