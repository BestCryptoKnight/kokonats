import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { hScaleRatio, wScale } from "../../../utils/scailing";
import shadows from "../../../theme/shadows";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: "column",
  },
  tab: {
    height: hScaleRatio(80),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  chat: {
    width: wScale(60),
    height: hScaleRatio(60),
    position: 'absolute',
    bottom: 100,
    right: 20,
    ...shadows.default
  },
  unreadDot: {
    position: "absolute",
    right: -5,
    top: -5
  }
});

export default styles;
