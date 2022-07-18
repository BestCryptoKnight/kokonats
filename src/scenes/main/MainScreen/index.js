import React, { useState, useEffect } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import KokoStatusBar from "../../../components/KokoStatusBar";
import HomeTabItem from "../../../components/main/HomeTabItem";
import HomeScreen from "../home/HomeScreen";
import StoreScreen from "../store/StoreScreen";
import ProfileScreen from "../profile/ProfileScreen";
import { isFirstLaunch, isLoggedIn, setLaunched } from "../../../redux/utils/localDataManager";
import EventBus from "react-native-event-bus";
import { GO_TO_HOME, GO_TO_STORE, REFRESH_CHAT_MESSAGES } from "../../../events/types";
import * as appActions from '../../../redux/actions/appActions';
import * as chatActions from '../../../redux/actions/chatActions';
import TutorialDialog from "../../../components/TutorialDialog";
import Chat from "../../../../assets/images/chat.svg";
import ChatUnreadDot from "../../../components/chat/ChatUnreadDot";
import { getUnreadCount } from "../../../redux/selectors";
import { calcUnreadMessagesThreads } from "../../../utils/chatUtils";
import firestore from "@react-native-firebase/firestore";
import { CHAT_THREAD_COLLECTION, ChatType } from "../../../consts/chatConfig";
import { isChatTimeRecentUpdated } from "../../../utils/stringUtils";

const HomeTabs = {Store: 'Store', Home: 'Home', Profile: 'Profile'};

const MainScreen = props => {
  const [tab, setTab] = useState(HomeTabs.Home);
  const [showTutorial, setShowTutorial] = useState(false);

  isFirstLaunch().then(value => setShowTutorial(value));

  useEffect(() => {
    props.appActions.loadAppData();
    EventBus.getInstance().addListener(GO_TO_STORE, this.listener = data => {
     onStorePressed();
    });
    EventBus.getInstance().addListener(GO_TO_HOME, this.listener = data => {
      onHomePressed();
    });
    firestore().collection(CHAT_THREAD_COLLECTION).onSnapshot(snapshot => {
      onChatThreadUpdated(snapshot);
    });
  }, []);

  const onChatThreadUpdated = (snapshot) => {
    snapshot.docChanges().forEach(change => {
      const data = change.doc.data();
      const recentUpdated = isChatTimeRecentUpdated(data.lastSentAt);
      if (recentUpdated) {
        const type = data.type === "PUBLIC" ? ChatType.Room : data.type === "DM" ? ChatType.DM : ChatType.CS;
        props.chatActions.fetchChatThreads(type);
        EventBus.getInstance().fireEvent(REFRESH_CHAT_MESSAGES, {thread: change.doc.id});
      }
    });
  };

  const onStorePressed = () => {
    isLoggedIn().then(value => {
      if (value) {
        setTab(HomeTabs.Store);
      } else {
        props.navigation.navigate('LoginScreen');
      }
    });
  }

  const onHomePressed = () => {
    setTab(HomeTabs.Home);
  }

  const onUserPressed = () => {
    isLoggedIn().then(value => {
      if (value) {
        setTab(HomeTabs.Profile);
      } else {
        props.navigation.navigate('LoginScreen');
      }
    });
  }

  const onGetStarted = () => {
    setShowTutorial(false);
    setLaunched(true);
  };

  const onChatPress = () => {
    props.navigation.navigate('ChatScreen');
  };

  return (
    <View style={styles.container}>
      <KokoStatusBar />
      <View style={{flex: 1}}>
        {
          tab === HomeTabs.Store && <StoreScreen navigation={props.navigation}/>
        }
        {
          tab === HomeTabs.Home && <HomeScreen navigation={props.navigation}/>
        }
        {
          tab === HomeTabs.Profile && <ProfileScreen navigation={props.navigation}/>
        }
      </View>
      <View style={styles.tab}>
        <HomeTabItem
          image={require('../../../../assets/images/bag.png')}
          isSelected={tab === HomeTabs.Store}
          onPress={onStorePressed}
        />
        <HomeTabItem
          image={require('../../../../assets/images/home.png')}
          isSelected={tab === HomeTabs.Home}
          onPress={onHomePressed}
        />
        <HomeTabItem
          image={require('../../../../assets/images/user.png')}
          isSelected={tab === HomeTabs.Profile}
          onPress={onUserPressed}
        />
      </View>
      <TouchableOpacity onPress={onChatPress} style={styles.chat}>
        <Chat width={60} height={60}/>
        {
          calcUnreadMessagesThreads(props.unreadMessages, []) > 0 && <ChatUnreadDot style={styles.unreadDot} />
        }
      </TouchableOpacity>
      <Modal transparent={true} visible={showTutorial} animationType='fade' onRequestClose={() => {setShowTutorial(false);}}>
        <TutorialDialog onGetStarted={onGetStarted}/>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    unreadMessages: getUnreadCount(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    chatActions: bindActionCreators(chatActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
