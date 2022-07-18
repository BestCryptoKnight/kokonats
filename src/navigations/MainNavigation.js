import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from "../scenes/main/MainScreen";
import LoginScreen from "../scenes/auth/LoginScreen";
import ProfileEditScreen from "../scenes/main/profile/ProfileEditScreen";
import GameDetailScreen from "../scenes/main/home/GameDetailScreen";
import TournamentDetailScreen from "../scenes/main/home/TournamentDetailScreen";
import StoreEnergyScreen from "../scenes/main/store/StoreEnergyScreen";
import StoreGameScreen from "../scenes/main/store/StoreGameScreen";
import HistoryScreen from "../scenes/main/profile/HistoryScreen";
import BlockListScreen from "../scenes/main/profile/BlocklistScreen";
import ChatScreen from "../scenes/main/chat/ChatScreen";
import GamePlayScreen from "../scenes/main/home/GamePlayScreen";
import GameResultScreen from "../scenes/main/home/GameResultScreen";
import MatchDetailScreen from "../scenes/main/home/MatchDetailScreen";
import MatchResultScreen from "../scenes/main/home/MatchResultScreen";

const MainNavigation = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  MainScreen: {
    screen: MainScreen
  },
  ProfileEditScreen: {
    screen: ProfileEditScreen
  },
  GameDetailScreen: {
    screen: GameDetailScreen
  },
  TournamentDetailScreen: {
    screen: TournamentDetailScreen
  },
  MatchDetailScreen: {
    screen: MatchDetailScreen
  },
  StoreEnergyScreen: {
    screen: StoreEnergyScreen
  },
  StoreGameScreen: {
    screen: StoreGameScreen
  },
  HistoryScreen: {
    screen: HistoryScreen
  },
  BlockListScreen: {
    screen: BlockListScreen
  },
  ChatScreen: {
    screen: ChatScreen
  },
  GamePlayScreen: {
    screen: GamePlayScreen
  },
  GameResultScreen: {
    screen: GameResultScreen
  },
  MatchResultScreen: {
    screen: MatchResultScreen
  }
}, {
  initialRouteName: 'MainScreen',
  defaultNavigationOptions: {
    headerShown: false,
    headerTitle: null,
  }
},);

export default MainNavigation;
