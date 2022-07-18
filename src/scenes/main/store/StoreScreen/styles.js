import { StatusBar, StyleSheet } from "react-native";
import colors from "../../../../theme/colors";
import { hScaleRatio, wScale } from "../../../../utils/scailing";
import dimensions from "../../../../theme/dimensions";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: "column",
    marginHorizontal: wScale(24)
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: dimensions.paddingTop,
  },
  marquee: {
    marginTop: hScaleRatio(22),
    marginBottom: hScaleRatio(20)
  },
  title: {
    fontFamily: "Noto Sans",
    fontSize: 34,
    color: colors.white,
    marginBottom: hScaleRatio(4)
  },
  gameSeparator: {
    height: 12
  }
});

export default styles;
