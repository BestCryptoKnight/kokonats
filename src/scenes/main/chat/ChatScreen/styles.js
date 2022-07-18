import { StyleSheet } from "react-native";
import colors from "../../../../theme/colors";
import dimensions from "../../../../theme/dimensions";
import { hScaleRatio, wScale } from "../../../../utils/scailing";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flex: 1,
    flexDirection: "column",
  },
  appBar: {
    marginTop: dimensions.paddingTop,
    flexDirection: 'row',
    marginHorizontal: dimensions.paddingHPrimary
  },
  tabBar: {
    marginHorizontal: dimensions.paddingHPrimary,
    marginTop: hScaleRatio(15),
    flexDirection: 'row'
  },
  tabItem: {
    marginHorizontal: wScale(10)
  },

});

export default styles;
