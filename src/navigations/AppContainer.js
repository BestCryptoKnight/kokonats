import React from "react";
import { createAppContainer } from "react-navigation";
import MainNavigation from "./MainNavigation";
import FlashMessage from "react-native-flash-message";

export const AppContainer = createAppContainer(MainNavigation);

export const KokoApp = () => {
  return (
    <React.Fragment>
      <AppContainer />
      <FlashMessage position="bottom" />
    </React.Fragment>
  );
}
