import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducers from "./redux/reducers";
import creatSagaMiddleware from "redux-saga";
import sagas from "./redux/sagas";
import KokoNavigation from "./navigations";
import { withIAPContext } from "react-native-iap";
import messaging from "@react-native-firebase/messaging";
import { fcmService } from "./notification/FCMService";
import { localNotificationService } from "./notification/LocalNotificationService";

const sagaMiddleware = creatSagaMiddleware();
let store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(sagas);

const App = () => {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification)
  }, []);


  const onRegister = (token) => {
    console.log("[App] Token", token);
  }

  const onNotification = (notify) => {
    console.log("[App] onNotification", notify);
    const options = {
      soundName: 'default',
      playSound: true,
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_launcher", // (optional) default:  "ic_notification" with fallback for "ic_launcher"
    }

    localNotificationService.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify,
      options,
    )
  }

  const onOpenNotification = async (notify) => {
    console.log('notify', notify);
  }

  return (
    <Provider store={store}>
      <KokoNavigation />
    </Provider>
  );
};

export default withIAPContext(App);
