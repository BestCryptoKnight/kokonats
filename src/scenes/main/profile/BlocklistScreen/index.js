import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Modal } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import BackButton from "../../../../components/BackButton";
import "../../../../utils/i18n";
import { useTranslation } from "react-i18next";
import BlockListItem from "../../../../components/main/profile/BlockListItem";
import * as authActions from '../../../../redux/actions/authActions';
import { getBlockedUsers } from "../../../../redux/selectors";
import colors from "../../../../theme/colors";
import ActionSheet from "../../../../components/ActionSheet";


const BlockListScreen = props => {
  const { t } = useTranslation();
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const actionItems = [
    {
      label: t("profile.unblock"),
      color: colors.red,
      onPress: () => unblock(),
    }
  ];

  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onMore = (user) => {
    setSelectedUser(user);
    setShowActionSheet(true);
  };

  const unblock = () => {
    setShowActionSheet(false);
    props.authActions.unblockUser(selectedUser.id);
  };

  const onCancel = () => {
    setShowActionSheet(false);
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={onBackPress} style={styles.backButton} />
      <Text style={styles.title}>{t('profile.blockList')}</Text>
      <FlatList
        style={styles.list}
        data={props.blockedUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <BlockListItem style={{ padding: 10 }} user={item} onMore={() => onMore(item)}/>
        )} />
      <Modal transparent={true} visible={showActionSheet} animationType="fade" >
        <ActionSheet
          actionItems={actionItems}
          onCancel={onCancel}
        />
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    blockedUsers: getBlockedUsers(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockListScreen);
