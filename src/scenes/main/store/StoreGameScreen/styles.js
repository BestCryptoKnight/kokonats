import { StyleSheet } from "react-native";
import colors from "../../../../theme/colors";
import dimensions from "../../../../theme/dimensions";
import { hScaleRatio, wScale } from "../../../../utils/scailing";
import shadows from "../../../../theme/shadows";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: dimensions.paddingHPrimary
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: dimensions.paddingTop
  },
  title: {
    marginLeft: wScale(16),
    fontFamily: "Noto Sans",
    fontWeight: '700',
    fontSize: 30,
    color: colors.white
  },
  coin: {
    alignSelf: 'center',
    marginTop: hScaleRatio(25)
  },
  gameContainer: {
    height: hScaleRatio(90),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wScale(11),
    paddingVertical: hScaleRatio(10),
    backgroundColor: colors.onBg,
    borderRadius: 10,
    marginTop: hScaleRatio(40),
    ...shadows.default,
  },
  gameImage: {
    width: wScale(70),
    height: hScaleRatio(70),
  },
  gameTitle: {
    fontFamily: "Noto Sans",
    fontSize: 18,
    color: colors.white,
    marginLeft: wScale(18),
    lineHeight: 20,
  },
});

export default styles;
