import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import dimensions from "../../../theme/dimensions";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  backButton: {
    marginTop: dimensions.paddingTop,
    width: '100%',
    paddingLeft: wScale(60)
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontFamily: "Noto Sans",
    marginVertical: hScaleRatio(30)
  },
  secondary: {
    flexDirection: 'row',
    marginTop: hScaleRatio(30)
  },
  footer: {
    fontSize: 11,
    color: colors.textGray,
    marginBottom: hScaleRatio(50),
    marginHorizontal: wScale(24),
    textAlign: 'center'
  }
});

export default styles;
