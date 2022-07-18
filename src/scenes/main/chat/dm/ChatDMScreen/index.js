import React, { useState, useEffect, useRef } from "react";
import { FlatList, Modal, Text, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import "../../../../../utils/i18n";
import { useTranslation } from "react-i18next";
import ChatMessage from "../../../../../components/chat/ChatMessage";
import ChatBackButton from "../../../../../components/chat/ChatBackButton";
import ChatMessageComposer from "../../../../../components/chat/ChatMessageComposer";
import * as chatActions from "../../../../../redux/actions/chatActions";
import * as authActions from "../../../../../redux/actions/authActions";
import { getUserInfo } from "../../../../../redux/selectors";
import { ChatType } from "../../../../../consts/chatConfig";
import EventBus from "react-native-event-bus";
import { REFRESH_CHAT_MESSAGES } from "../../../../../events/types";
import MoreButton from "../../../../../components/MoreButton";
import ActionSheet from "../../../../../components/ActionSheet";
import colors from "../../../../../theme/colors";

const ChatDMScreen = props => {
  const { t } = useTranslation();
  const participant = (props.thread.membersDetail.filter(memberDetail => memberDetail.id !== props.me.id))[0];
  const [messages, setMessages] = useState([]);
  const [actionSheet, setActionSheet] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const ref = useRef();
  const actionItems = [
    {
      label: t("chat.report"),
      color: colors.red,
      onPress: () => onReport(),
    },
    {
      label: t("chat.block"),
      color: colors.red,
      onPress: () => onBlock(),
    }
  ];

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
    props.onBack();
  };

  const onSendMessage = (message) => {
    props.chatActions.sendMessage(props.thread.threadID, message, props.me, onSendMessageSuccess);
  };

  const onSendMessageSuccess = (message) => {
    const newMessages = [message, ...messages];
    setMessages(newMessages);
    props.chatActions.fetchChatThreads(ChatType.DM);
    ref.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const renderMessageItem = (item) => {
    return <ChatMessage message={item.item} />;
  };

  const renderSeparator = () => {
    return <View style={styles.messageSeparator} />;
  };

  const onMoreButtonPress = () => {
    setActionSheet(true);
  };

  const onCancelActionSheet = () => {
    setActionSheet(false);
  };

  const onReport = () => {
    setActionSheet(false);
  };

  const onBlock = () => {
    setActionSheet(false);
    props.authActions.blockUser(participant.id, onBlockSuccess, onBlockFail);
  };

  const onBlockSuccess = () => {
    props.onBack();
  };

  const onBlockFail = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <ChatBackButton style={styles.back} onPress={onBackPress} />
        <Text style={styles.title}>{participant.userName}</Text>
        <MoreButton style={styles.more} onPress={onMoreButtonPress} />
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
      <ChatMessageComposer onSend={onSendMessage} />
      <Modal transparent={true} visible={actionSheet} animationType="fade" >
        <ActionSheet
          actionItems={actionItems}
          onCancel={onCancelActionSheet}
        />
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    me: getUserInfo(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    chatActions: bindActionCreators(chatActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDMScreen);
