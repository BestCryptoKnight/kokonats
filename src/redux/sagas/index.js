import {all} from 'redux-saga/effects';
import {
  watchBlockUser,
  watchFetchBlockList,
  watchFetchUserInfo,
  watchGetUserTournamentHistory, watchRegisterFCMToken,
  watchSignIn,
  watchSignOut, watchUnblockUser,
  watchUpdateUserInfo,
} from "./authSaga";
import {
  watchFetchCoin,
  watchFetchEnergy,
  watchGetGameItems,
  watchGetPurchasedItems,
  watchPurchaseEnergy,
  watchPurchaseItems,
} from "./storeSaga";
import { watchLoadAppDataSaga } from "./appSaga";
import {
  watchFetchGameAuthToken,
  watchFetchGameList, watchFetchGameMatches, watchFetchGamePlayStatus, watchFetchGameTournaments,
  watchFetchTournamentClasses,
  watchFetchTournamentHistory,
  watchFetchTournamentPlayable,
  watchFetchTournamentRanking, watchJoinTournament, watchStartMatchPairing, watchStartMatchSession,
} from "./gameSaga";
import {
  watchCheckBlock,
  watchFetchChatThreadMessage,
  watchFetchChatThreads,
  watchFetchThreadUnreadMessageCount, watchSendMessage,
  watchSetThreadReadAt,
} from "./chatSaga";

export default function* sagas() {
  yield all([
    // App
    watchLoadAppDataSaga(),

    // Auth
    watchSignIn(),
    watchSignOut(),
    watchFetchUserInfo(),
    watchFetchBlockList(),
    watchUpdateUserInfo(),
    watchGetUserTournamentHistory(),
    watchRegisterFCMToken(),
    watchBlockUser(),
    watchUnblockUser(),

    // Store
    watchFetchEnergy(),
    watchFetchCoin(),
    watchGetGameItems(),
    watchPurchaseItems(),
    watchGetPurchasedItems(),
    watchPurchaseEnergy(),

    // Game
    watchFetchTournamentClasses(),
    watchFetchGameList(),
    watchFetchTournamentPlayable(),
    watchFetchTournamentRanking(),
    watchFetchTournamentHistory(),
    watchJoinTournament(),
    watchFetchGameAuthToken(),
    watchFetchGamePlayStatus(),
    watchFetchGameTournaments(),
    watchFetchGameMatches(),
    watchStartMatchSession(),
    watchStartMatchPairing(),

    // Chat
    watchFetchChatThreads(),
    watchFetchChatThreadMessage(),
    watchFetchThreadUnreadMessageCount(),
    watchSetThreadReadAt(),
    watchSendMessage(),
    watchCheckBlock()
  ]);
}
