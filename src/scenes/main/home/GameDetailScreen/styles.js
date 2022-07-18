import { StyleSheet } from "react-native";
import colors from "../../../../theme/colors";
import { hScaleRatio, width, wScale } from "../../../../utils/scailing";
import dimensions from "../../../../theme/dimensions";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: "column",
  },
  appbarContainer: {
    flexDirection: 'row',
    marginTop: dimensions.paddingTop,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: dimensions.paddingHSecondary
  },
  contentContainer: {
    flex: 1,
    marginTop: hScaleRatio(24)
  },
  coverContainer: {
    width: width - 104,
    height: width - 104,
    marginHorizontal: dimensions.paddingHSecondary,
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
  sponsor: {
    width: width - 104,
    marginHorizontal: dimensions.paddingHSecondary,
    marginTop: hScaleRatio(20)
  },
  description: {
    marginHorizontal: dimensions.paddingHSecondary,
    marginTop: hScaleRatio(20),
    color: colors.white,
    fontSize: 14
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
  },
  tournamentSeparator: {
    width: wScale(24)
  },
});

export default styles;
