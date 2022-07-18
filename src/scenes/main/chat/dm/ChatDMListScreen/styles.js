import { StyleSheet } from "react-native";
import colors from "../../../../../theme/colors";
import { hScaleRatio, wScale } from "../../../../../utils/scailing";
import dimensions from "../../../../../theme/dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  search: {
    marginTop: hScaleRatio(20),
    marginHorizontal: dimensions.paddingHPrimary,
    backgroundColor: colors.gray,
    borderRadius: wScale(10),
    paddingHorizontal: wScale(10),
    height: hScaleRatio(40)
  },
  threadList: {
    marginHorizontal: dimensions.paddingHPrimary,
    marginTop: hScaleRatio(20),
  },
  threadSeparator: {
    height: hScaleRatio(15)
  }
});

export default styles;
