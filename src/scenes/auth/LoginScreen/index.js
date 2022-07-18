import React, { useEffect, useState } from "react";
import { Text, View, NativeModules } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import Logo from "../../../../assets/images/logo.svg";
import SocialLoginPrimary from "../../../components/auth/SocialLoginPrimary";
import SocialLoginSecondary from "../../../components/auth/SocialLoginSecondary";
import BackButton from "../../../components/BackButton";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-community/google-signin";
import { bindActionCreators } from "redux";
import * as authActions from '../../../redux/actions/authActions';
import { LoginType } from "../../../consts/authConfig";
import { errorMessage } from "../../../utils/alerts";
import { appleAuth } from "@invertase/react-native-apple-authentication";
const { RNTwitterSignIn } = NativeModules;

const LoginScreen = props => {

  GoogleSignin.configure({
    webClientId: '124310744417-1bfi3vm4kaidqi57gffbjik9m29dr7le.apps.googleusercontent.com',
  });

  const TwitterKeys = {
    TWITTER_COMSUMER_KEY: 'pPyy0Ui3yehqeYaaz3tYjICrl',
    TWITTER_CONSUMER_SECRET: 'enbIUT1yIgpXbX3GX1GtTJWTXZyp1flS4JcWDcEw7F8nluvQMO',
  };

  const [user, setUser] = useState();
  const [authType, setAuthType] = useState(LoginType.Google);
  const [anonymousToken, setAnonymousToken] = useState('');
  const [firebaseIdToken, setFirebaseIdToken] = useState('');

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  const onBackPress = () => {
    props.navigation.goBack();
  }

  const onAuthStateChanged = (user) => {
    if (user) {
      setUser(user);
      user.getIdToken().then((idToken) => {
        console.log('[FirebaseIdToken]', idToken);
        setFirebaseIdToken(idToken);
        if (idToken) {
          props.authActions.signIn({
            params: {idToken: idToken, anonymousToken: anonymousToken, type: authType},
            onSuccess: onLoginSuccess,
            onFail: onLoginFailed
          });
        }
      });
    }
  };

  const onApplePress = async () => {
    setAuthType(LoginType.Apple);
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (!appleAuthRequestResponse.identityToken) {
      return;
    }

    const { identityToken, nonce } = appleAuthRequestResponse;
    setAnonymousToken(identityToken);
    if (user) {
      props.authActions.signIn({
        params: {idToken: firebaseIdToken, anonymousToken: identityToken, type: authType},
        onSuccess: onLoginSuccess,
        onFail: onLoginFailed
      });
    } else {
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      await auth().signInWithCredential(appleCredential);
    }
  }

  const onGooglePress = async () => {
    setAuthType(LoginType.Google);
    const { idToken } = await GoogleSignin.signIn();
    setAnonymousToken(idToken);
    if (user) {
      props.authActions.signIn({
        params: {idToken: firebaseIdToken, anonymousToken: idToken, type: authType},
        onSuccess: onLoginSuccess,
        onFail: onLoginFailed
      });
    } else {
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    }
  }

  const onTwitterPress = async () => {
    setAuthType(LoginType.Twitter);
    RNTwitterSignIn.init(
      TwitterKeys.TWITTER_COMSUMER_KEY,
      TwitterKeys.TWITTER_CONSUMER_SECRET,
    ).then(() =>
      console.log('Twitter SDK initialized'),
    );

    const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
    setAnonymousToken(authToken);
    if (user) {
      props.authActions.signIn({
        params: {idToken: firebaseIdToken, anonymousToken: authToken, type: authType},
        onSuccess: onLoginSuccess,
        onFail: onLoginFailed
      });
    } else {
      const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
      await auth().signInWithCredential(twitterCredential);
    }
  }

  const onLoginSuccess = (response) => {
    props.navigation.goBack();
  };

  const onLoginFailed = (error) => {
    errorMessage({message: error.errorMessage});
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <BackButton onPress={onBackPress}/>
      </View>
      <View style={{flex: 2}}/>
      <Logo width={88} height={90} />
      <Text style={styles.title}>アカウント作成</Text>
      <SocialLoginPrimary onPress={onApplePress} />
      <View style={styles.secondary}>
        <SocialLoginSecondary type={LoginType.Google} style={{marginRight: 24}} onPress={onGooglePress}/>
        <SocialLoginSecondary type={LoginType.Twitter} onPress={onTwitterPress}/>
      </View>
      <View style={{flex: 3}}/>
      <Text style={styles.footer}>登録するとプライバシーポリシーと利用規約に同意したものとみなします。</Text>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
