import { StyleSheet } from "react-native";
import colors from "../../../../theme/colors";
import { wScale, hScaleRatio } from "../../../../utils/scailing";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: "column",
  },
  backButton: {
    marginLeft: wScale(59),
    marginTop: (53),
  },
  title: {
    fontFamily: "Noto Sans",
    fontSize: 34,
    fontWeight: "700",
    color: colors.white,
    marginLeft: wScale(59),
    marginTop: hScaleRatio(32),
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: hScaleRatio(20),
  },
  text: {
    fontFamily: "Noto Sans",
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
  },
  dollarText: {
    fontFamily: "Noto Sans",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.coinYellow,
    marginLeft: wScale(6)
  },
  totalContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: wScale(59),
  },
  totalValueContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  historyItem: {
    marginTop: hScaleRatio(24),
  },
});

export default styles;
