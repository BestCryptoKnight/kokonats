import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from "react-native";
import colors from "../theme/colors";

const KokoStatusBar = () => (
  <View style={styles.statusBar}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={colors.background} barStyle="light-content" />
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
    backgroundColor: colors.background
  }
});

export default KokoStatusBar;
