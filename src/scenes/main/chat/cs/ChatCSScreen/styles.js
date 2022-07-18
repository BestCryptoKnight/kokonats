import { StyleSheet } from "react-native";
import colors from "../../../../../theme/colors";
import dimensions from "../../../../../theme/dimensions";
import { hScaleRatio } from "../../../../../utils/scailing";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  messageList: {
    marginHorizontal: dimensions.paddingHPrimary,
    marginBottom: hScaleRatio(15)
  },
  messageItem: {

  },
  messageSeparator: {
    height: hScaleRatio(20)
  }
});

export default styles;
