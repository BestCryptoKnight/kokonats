import { StyleSheet } from "react-native";
import colors from "../../../../theme/colors";
import { hScaleRatio, wScale } from "../../../../utils/scailing";
import dimensions from "../../../../theme/dimensions";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: "column",
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wScale(24),
    marginTop: dimensions.paddingTop,
    justifyContent: 'space-between'
  },
  marquee: {
    marginHorizontal: wScale(24),
    marginTop: hScaleRatio(22),
    marginBottom: hScaleRatio(20),
  },
  title: {
    fontFamily: "Noto Sans",
    fontSize: 34,
    fontWeight: '700',
    color: colors.white,
    marginLeft: wScale(24),
  },
  tagContainer: {
    width: '100%',
    marginVertical: hScaleRatio(20),
  },
  tagSeparator: {
    width: wScale(16)
  },
  tournamentContainer: {
    marginBottom: hScaleRatio(20),
  }
});

export default styles;
