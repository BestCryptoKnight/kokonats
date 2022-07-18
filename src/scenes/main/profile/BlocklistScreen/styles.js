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
  title:{
    fontFamily: "Noto Sans",
    fontSize: 34,
    fontWeight: '700',
    color: colors.white,
    marginLeft: wScale(59),
    marginTop: hScaleRatio(32)
  },
  list: {
    marginTop: 20,
    marginLeft: 49
  }
});

export default styles;
