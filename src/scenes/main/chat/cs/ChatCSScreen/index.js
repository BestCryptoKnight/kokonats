import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import { getCSThreads, getPublicThreads } from "../../../../../redux/selectors";
import * as chatActions from "../../../../../redux/actions/chatActions";
import ChatMessage from "../../../../../components/chat/ChatMessage";
import ChatMessageComposer from "../../../../../components/chat/ChatMessageComposer";


const ChatCSScreen = props => {
  const thread = props.threads[0];
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    props.chatActions.fetchChatThreadMessages(thread.threadID, onThreadMessagesSuccess, onThreadMessagesFail);
  }, []);

  const onThreadMessagesSuccess = (messages) => {
    setMessages(messages);
  };

  const onThreadMessagesFail = (error) => {

  };

  const onSendMessage = (message) => {
  };

  const renderMessageItem = (item) => {
    return <ChatMessage message={item.item} />;
  }

  const renderSeparator = () => {
    return <View style={styles.messageSeparator}/>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        style={styles.messageList}
        renderItem={renderMessageItem}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false} />
      <ChatMessageComposer onSend={onSendMessage}/>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    threads: getCSThreads(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    chatActions: bindActionCreators(chatActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatCSScreen);
