import { StyleSheet } from "react-native";
import colors from "../../../../theme/colors";
import dimensions from "../../../../theme/dimensions";
import { hScaleRatio, wScale } from "../../../../utils/scailing";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: dimensions.paddingHSecondary,
    marginTop: hScaleRatio(60),
    marginBottom: hScaleRatio(40)
  },
  title: {
    fontFamily: "Noto Sans",
    fontWeight: "700",
    fontSize: 34,
    color: colors.white
  },
  rankingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hScaleRatio(20),
    alignItems: "center"
  },
  ranking: {
    fontFamily: "Noto Sans",
    fontWeight: "900",
    fontSize: 48,
    color: colors.yellow
  },
  score: {
    marginTop: hScaleRatio(20),
    fontFamily: "Noto Sans",
    fontWeight: "900",
    fontSize: 14,
    color: colors.white
  },
  scoreContainer: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: colors.onBg,
    padding: wScale(20),
    marginTop: hScaleRatio(5)
  },
  separator: {
    height: hScaleRatio(10)
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hScaleRatio(40)
  },
  button: {
    flex: 1,
    height: hScaleRatio(48),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wScale(10),
    backgroundColor: colors.onBg
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
  },
  rankingItemContainer: {
    flexDirection: "row",
    alignItems: 'center',
  },
  rankingCircle: {
    width: wScale(36),
    height: hScaleRatio(36),
    borderRadius: wScale(18),
    backgroundColor: 'rgba(72, 112, 255, 0.1)',
    justifyContent: "center",
    alignItems: "center"
  },
  rankingText: {
    fontFamily: "Noto Sans",
    fontSize: 14,
    fontWeight: "900",
    color: colors.white
  },
  points: {
    fontFamily: "Noto Sans",
    fontWeight: '900',
    fontSize: 18,
    color: colors.white,
    lineHeight: 24
  },
  username: {
    fontFamily: "Noto Sans",
    fontSize: 14,
    color: colors.white,
    lineHeight: 16
  }
});

export default styles;
