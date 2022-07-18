import React, { useState, useEffect } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import { getBlockedUsers, getDMThreads, getUnreadCount, getUserInfo } from "../../../../../redux/selectors";
import ChatDMScreen from "../ChatDMScreen";
import ChatDMThreadItem from "../../../../../components/chat/dm/ChatDMThreadItem";
import { calcUnreadMessagesThreads } from "../../../../../utils/chatUtils";
import * as chatActions from '../../../../../redux/actions/chatActions';
import { ConfirmDialogType } from "../../../../../consts/config";
import KokoConfirmDialog from "../../../../../components/KokoConfirmDialog";
import { useTranslation } from "react-i18next";
import "../../../../../utils/i18n";

const ChatDMListScreen = props => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedThread, setSelectedThread] = useState(null);
  const [temp, setTemp] = useState(null);
  const [showBlockDialog, setShowBlockDialog] = useState(false);

  const renderThreadItem = item => {
    return <ChatDMThreadItem thread={item.item} myID={props.me.id} unread={calcUnreadMessagesThreads(props.unreadMessages, [item.item.threadID])} onPress={() => onPressThread(item.item)} />;
  };

  const renderSeparator = () => {
    return <View style={styles.threadSeparator}/>;
  }

  const onPressThread = (thread) => {
    setTemp(thread);
    const participantId = thread.members.filter(value => value !== props.me.id)[0];
    props.chatActions.checkBlocked(participantId, onCheckSuccess, onCheckFail);
  };

  const onCheckSuccess = (blocked) => {
    if (blocked) {
      setShowBlockDialog(true);
    } else {
      setSelectedThread(temp);
    }
  };

  const onCheckFail = () => {
    setSelectedThread(temp);
  };

  const onBackBlockDialog = () => {
    setShowBlockDialog(false);
  };

  const onOkBlockDialog = () => {
    setShowBlockDialog(false);
  };

  const filterThreads = () => {
    return props.threads.filter(thread => {
      const memberDetails = thread.membersDetail;
      const participant = memberDetails.filter(member => member.id !== props.me.id)[0];
      const blockedUsers = props.blockedUsers.filter(user => user.id === participant.id);
      const isBlocked = blockedUsers.length > 0;
      if (isBlocked) return false;
      if (search === "") return true;
      return participant.userName.toLowerCase().includes(search.toLowerCase());
    });
  };

  return (
    <View style={styles.container}>
      {
        !selectedThread && <TextInput style={styles.search}
                                      underlineColorAndroid="transparent"
                                      placeholder="Enter User name"
                                      placeholderTextColor="rgba(0, 0, 0, 0.3)"
                                      onChangeText={text => setSearch(text)}
                                      autoCapitalize="none" />
      }
      {
        !selectedThread && <FlatList
          data={filterThreads()}
          style={styles.threadList}
          ItemSeparatorComponent={renderSeparator}
          renderItem={renderThreadItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}/>
      }
      {
        selectedThread && <ChatDMScreen thread={selectedThread} onBack={() => setSelectedThread(null)}/>
      }
      <KokoConfirmDialog
        visible={showBlockDialog}
        type={ConfirmDialogType.close}
        title={t("chat.block_title")}
        message={t("chat.blocked_by", { username: temp ? temp.userName : "" })}
        onCancel={onBackBlockDialog}
        onOk={onOkBlockDialog} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    threads: getDMThreads(state),
    unreadMessages: getUnreadCount(state),
    me: getUserInfo(state),
    blockedUsers: getBlockedUsers(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    chatActions: bindActionCreators(chatActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDMListScreen);
