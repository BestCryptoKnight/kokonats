import { StyleSheet } from "react-native";
import colors from "../../../../theme/colors";
import { wScale, hScaleRatio } from "../../../../utils/scailing";
import dimensions from "../../../../theme/dimensions";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-start'
  },
  backButton: {
    marginLeft: wScale(59),
    marginTop: (53),
  },
  contentContainer: {
    alignItems: "center"
  },
  avatar: {
    marginTop: hScaleRatio(30)
  },
  uid: {
    fontFamily: "Noto Sans",
    fontSize: 12,
    lineHeight:16,
    color: colors.white,
    marginTop: hScaleRatio(22),
    textAlign: 'center',
  },
  avatarGroup: {
    width: '100%',
    paddingHorizontal: dimensions.paddingHPrimary,
    flexDirection: 'row',
    marginTop: hScaleRatio(20),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  submit: {
    marginTop: hScaleRatio(195),
  },
  nameInput: {
    width: wScale(295),
    height: hScaleRatio(60),
    fontFamily: "Noto Sans",
    fontSize: 16,
    color: colors.white,
    textAlign: 'left',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.loginColor,
    paddingLeft: wScale(32),
    marginTop: hScaleRatio(28)
  }
});

export default styles;
