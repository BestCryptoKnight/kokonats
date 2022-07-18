import {put, call, takeLatest} from 'redux-saga/effects';
import { LOAD_APP_DATA } from "../actions/types";
import { isLoggedIn } from "../utils/localDataManager";
import { fetchCoin, fetchEnergy, getPurchasedItems } from "../actions/storeActions";
import { fetchGameList, fetchTournamentClasses } from "../actions/gameActions";
import { fetchBlockList, fetchUserInfo, getUserTournamentHistory, registerFCMToken } from "../actions/authActions";
import { fetchChatThreads } from "../actions/chatActions";
import { ChatType } from "../../consts/chatConfig";

export function* loadAppDataSaga() {
  const loggedIn = yield call(isLoggedIn);
  if (loggedIn) {
    yield put(fetchUserInfo());
    yield put(fetchBlockList());
    yield put(fetchEnergy());
    yield put(fetchCoin());
    yield put(fetchChatThreads(ChatType.Room));
    yield put(fetchChatThreads(ChatType.DM));
    yield put(fetchChatThreads(ChatType.CS));
    yield put(getUserTournamentHistory());
    yield put(getPurchasedItems());
    yield put(registerFCMToken());
  }
  yield put(fetchTournamentClasses());
  yield put(fetchGameList());
}

export function* watchLoadAppDataSaga() {
  yield takeLatest(LOAD_APP_DATA, loadAppDataSaga);
}
