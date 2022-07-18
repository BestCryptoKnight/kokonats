import React, { useState, useEffect, useRef } from "react";
import { FlatList, Text, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import * as chatActions from "../../../../../redux/actions/chatActions";
import ChatBackButton from "../../../../../components/chat/ChatBackButton";
import ChatMessageComposer from "../../../../../components/chat/ChatMessageComposer";
import ChatMessage from "../../../../../components/chat/ChatMessage";
import { ChatType } from "../../../../../consts/chatConfig";
import EventBus from "react-native-event-bus";
import { GO_TO_STORE, REFRESH_CHAT_MESSAGES } from "../../../../../events/types";

const ChatRoomScreen = props => {
  const [messages, setMessages] = useState([]);
  const ref = useRef();

  useEffect(() => {
    loadChatData();
    EventBus.getInstance().addListener(REFRESH_CHAT_MESSAGES, this.listener = data => {
      if (data.thread === props.thread.threadID) {
        loadChatData();
      }
    });
  }, []);

  const loadChatData = () => {
    props.chatActions.setThreadReadAt(props.thread.threadID);
    props.chatActions.fetchChatThreadMessages(props.thread.threadID, onThreadMessagesSuccess, onThreadMessagesFail);
  };

  const onThreadMessagesSuccess = (messages) => {
    setMessages(messages);
  };

  const onThreadMessagesFail = (error) => {

  };

  const onBackPress = () => {
    props.chatActions.setThreadReadAt(props.thread.threadID);
    props.onBack();
  };

  const onSendMessage = (message) => {
    props.chatActions.sendMessage(props.thread.threadID, message, props.me, onSendMessageSuccess);
  };

  const onSendMessageSuccess = (message) => {
    const newMessages = [message, ...messages];
    setMessages(newMessages);
    props.chatActions.fetchChatThreads(ChatType.Room);
    ref.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const renderMessageItem = (item) => {
    return <ChatMessage message={item.item} />;
  }

  const renderSeparator = () => {
    return <View style={styles.messageSeparator}/>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <ChatBackButton style={styles.back} onPress={onBackPress}/>
        <Text style={styles.title}>{props.thread.name}</Text>
      </View>
      <FlatList
        ref={ref}
        data={messages}
        style={styles.messageList}
        renderItem={renderMessageItem}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
        inverted={true}
        showsHorizontalScrollIndicator={false} />
      <ChatMessageComposer onSend={onSendMessage}/>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    chatActions: bindActionCreators(chatActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomScreen);
