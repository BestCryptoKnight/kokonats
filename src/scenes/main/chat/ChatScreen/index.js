import React, { useState, useEffect } from "react";
import { TextInput, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import CloseButton from "../../../../components/CloseButton";
import { ChatType } from "../../../../consts/chatConfig";
import ChatTab from "../../../../components/chat/ChatTab";
import ChatRoomListScreen from "../public/ChatRoomListScreen";
import ChatDMListScreen from "../dm/ChatDMListScreen";
import ChatCSScreen from "../cs/ChatCSScreen";
import { getCSThreads, getDMThreads, getPublicThreads, getUnreadCount } from "../../../../redux/selectors";
import { calcUnreadMessagesThreads } from "../../../../utils/chatUtils";

const ChatScreen = props => {
  const [tab, setTab] = useState(ChatType.Room);

  const onClose = () => {
    props.navigation.goBack();
  };

  const onTabPress = (type) => {
    setTab(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <View style={{ flex: 1 }} />
        <CloseButton onPress={onClose} />
      </View>
      <View style={styles.tabBar}>
        <ChatTab type={ChatType.Room} selected={tab === ChatType.Room} onPress={() => onTabPress(ChatType.Room)}
                 unread={calcUnreadMessagesThreads(props.unreadMessages, props.publicThreads.map(thread => thread.threadID))} />
        <ChatTab type={ChatType.DM} selected={tab === ChatType.DM} onPress={() => onTabPress(ChatType.DM)}
                 style={styles.tabItem}
                 unread={calcUnreadMessagesThreads(props.unreadMessages, props.dmThreads.map(thread => thread.threadID))} />
        <ChatTab type={ChatType.CS} selected={tab === ChatType.CS} onPress={() => onTabPress(ChatType.CS)}
                 unread={calcUnreadMessagesThreads(props.unreadMessages, props.csThreads.map(thread => thread.threadID))} />
      </View>

      {
        tab === ChatType.Room && <ChatRoomListScreen />
      }
      {
        tab === ChatType.DM && <ChatDMListScreen />
      }
      {
        tab === ChatType.CS && <ChatCSScreen />
      }
    </View>
  );
};

const mapStateToProps = state => {
  return {
    publicThreads: getPublicThreads(state),
    dmThreads: getDMThreads(state),
    csThreads: getCSThreads(state),
    unreadMessages: getUnreadCount(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
