import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { bindActionCreators } from "redux";
import BackButton from "../../../../components/BackButton";
import { connect } from "react-redux";
import styles from "./styles";
import { getUserInfo } from "../../../../redux/selectors";
import ProfileOkButton from "../../../../components/main/home/ProfileOkButton";
import UserAvatar from "../../../../components/main/profile/UserAvatar";
import { Avatars } from "../../../../consts/config";
import * as authActions from '../../../../redux/actions/authActions';
import { errorMessage } from "../../../../utils/alerts";

const ProfileEditScreen = props => {
  const [name, setName] = useState(props.userInfo.userName);
  const [avatar, setAvatar] = useState(props.userInfo.picture);

  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onUpdate = () => {
    props.authActions.updateUserInfo({
      params: {
        userName: name,
        picture: avatar
      },
      onSuccess: onUpdateSuccess,
      onFail: onUpdateFail
    });
  };

  const onUpdateSuccess = () => {
    props.navigation.goBack();
  };

  const onUpdateFail = (error) => {
    errorMessage("User info update failed");
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={onBackPress} style={styles.backButton} />
      <View style={styles.contentContainer}>
        <UserAvatar avatar={avatar} selected={true} activeOpacity={1} style = {styles.avatar}/>
        <Text style={styles.uid}>UID: {props.userInfo.id}</Text>
        <View style={styles.avatarGroup}>
          {
            Object.keys(Avatars).map(key => <UserAvatar avatar={key} selected={avatar === key} size={60} onPress={() => setAvatar(key)}/>)
          }
        </View>
        <TextInput
          style={styles.nameInput}
          onChangeText={setName}
          value={name}
        />
        <ProfileOkButton style={styles.submit} onPress={onUpdate}/>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userInfo: getUserInfo(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen);
