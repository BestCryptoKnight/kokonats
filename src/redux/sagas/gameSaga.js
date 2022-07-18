import {put, call, takeLatest, takeEvery} from 'redux-saga/effects';
import * as gameApi from '../services/gameApi';
import {
  GAME_FETCH_GAME_AUTH_TOKEN,
  GAME_FETCH_GAME_LIST,
  GAME_FETCH_GAME_MATCHES,
  GAME_FETCH_GAME_PLAY_STATUS,
  GAME_FETCH_GAME_TOURNAMENTS,
  GAME_FETCH_TOURNAMENT_CLASSES,
  GAME_FETCH_TOURNAMENT_HISTORY,
  GAME_FETCH_TOURNAMENT_PLAYABLE,
  GAME_FETCH_TOURNAMENT_RANKING,
  GAME_FETCH_TOURNAMENT_RANKING_HISTORY,
  GAME_JOIN_TOURNAMENT,
  GAME_MATCH_START_PAIRING,
  GAME_MATCH_START_SESSION,
} from "../actions/types";
import { fetchGameListSuccess, fetchTournamentClassesSuccess } from "../actions/gameActions";

export function* fetchTournamentClassesSaga(action) {
  try {
    const response = yield call(gameApi.fetchTournamentClasses);
    yield put(fetchTournamentClassesSuccess(response.data));
  } catch (error) {
  }
}

export function* watchFetchTournamentClasses() {
  yield takeLatest(GAME_FETCH_TOURNAMENT_CLASSES, fetchTournamentClassesSaga);
}

export function* fetchGameListSaga(action) {
  try {
    const response = yield call(gameApi.fetchGameList);
    yield put(fetchGameListSuccess(response.data));
  } catch (error) {
  }
}

export function* watchFetchGameList() {
  yield takeLatest(GAME_FETCH_GAME_LIST, fetchGameListSaga);
}

export function* fetchTournamentPlayableSaga(action) {
  try {
    const response = yield call(gameApi.fetchTournamentPlayable, action.tournamentClassId);
    action.onSuccess && action.onSuccess(response.data);
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchFetchTournamentPlayable() {
  yield takeLatest(GAME_FETCH_TOURNAMENT_PLAYABLE, fetchTournamentPlayableSaga);
}

export function* fetchTournamentRankingSaga(action) {
  try {
    const response = yield call(gameApi.fetchTournamentRanking, action.tournamentId);
    action.onSuccess && action.onSuccess(response.data);
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchFetchTournamentRanking() {
  yield takeLatest(GAME_FETCH_TOURNAMENT_RANKING, fetchTournamentRankingSaga);
}

export function* fetchTournamentHistorySaga(action) {
  try {
    const response = yield call(gameApi.fetchTournamentHistory, action.tournamentClassId);
    action.onSuccess && action.onSuccess(response.data);
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchFetchTournamentHistory() {
  yield takeLatest(GAME_FETCH_TOURNAMENT_HISTORY, fetchTournamentHistorySaga)
}

export function* joinTournamentSaga(action) {
  try {
    const response = yield call(gameApi.joinTournament, action.playableTournamentId);
    action.onSuccess && action.onSuccess(response.data);
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchJoinTournament() {
  yield takeLatest(GAME_JOIN_TOURNAMENT, joinTournamentSaga);
}

export function* fetchGameAuthTokenSaga(action) {
  try {
    const response = yield call(gameApi.fetchGameAuthToken, action.gameId);
    action.onSuccess && action.onSuccess(response.data.token);
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchFetchGameAuthToken() {
  yield takeLatest(GAME_FETCH_GAME_AUTH_TOKEN, fetchGameAuthTokenSaga)
}

export function* fetchGamePlayStatusSaga(action) {
  try {
    const status = yield call(gameApi.fetchGamePlayStatus, action.playType, action.playId, action.subscriber);
    action.onSuccess && action.onSuccess(status);
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchFetchGamePlayStatus() {
  yield takeEvery(GAME_FETCH_GAME_PLAY_STATUS, fetchGamePlayStatusSaga);
}

export function* fetchGameTournamentsSaga(action) {
  try {
    const response = yield call(gameApi.fetchGameTournaments, action.gameId);
    action.onSuccess && action.onSuccess(response.data);
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchFetchGameTournaments() {
  yield takeLatest(GAME_FETCH_GAME_TOURNAMENTS, fetchGameTournamentsSaga);
}

export function* fetchGameMatchesSaga(action) {
  try {
    const response = yield call(gameApi.fetchGameMatches, action.gameId);
    action.onSuccess && action.onSuccess(response.data);
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchFetchGameMatches() {
  yield takeLatest(GAME_FETCH_GAME_MATCHES, fetchGameMatchesSaga)
}

export function* startMatchSessionSaga(action) {
  try {
    const response = yield call(gameApi.startMatchSession, action.matchId);
    action.onSuccess && action.onSuccess(response.data.sessionId);
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchStartMatchSession() {
  yield takeLatest(GAME_MATCH_START_SESSION, startMatchSessionSaga);
}

export function* startMatchPairingSaga(action) {
  try {
    const response = yield call(gameApi.startMatchPairing, action.sessionId);
    if (!response) {
      action.onFail && action.onFail({state: "not_available"});
    } else {
      action.onSuccess && action.onSuccess(response.matchPlayId, response.users);
    }
  } catch (error) {
    action.onFail && action.onFail({state: "api_failed"});
  }
}

export function* watchStartMatchPairing() {
  yield takeLatest(GAME_MATCH_START_PAIRING, startMatchPairingSaga);
}
