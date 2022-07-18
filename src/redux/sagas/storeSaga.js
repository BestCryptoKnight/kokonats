import { put, call, takeLatest } from 'redux-saga/effects';
import * as storeApi from '../services/storeApi';
import {
  GET_GAME_ITEMS,
  GET_PURCHASED_ITEMS,
  PURCHASE_ENERGY,
  PURCHASE_ITEMS,
  STORE_FETCH_COIN,
  STORE_FETCH_ENERGY,
} from "../actions/types";
import {
  fetchCoinSuccess,
  fetchEnergy,
  fetchEnergySuccess,
  getGameItemsSuccess,
  purchaseItemsSuccess,
} from "../actions/storeActions";

export function* fetchEnergySaga() {
  try {
    const response = yield call(storeApi.fetchEnergy);
    yield put(fetchEnergySuccess(response.data));
  } catch (error) {
  }
}

export function* watchFetchEnergy() {
  yield takeLatest(STORE_FETCH_ENERGY, fetchEnergySaga);
}

export function* fetchCoinSaga() {
  try {
    const response = yield call(storeApi.fetchCoin);
    yield put(fetchCoinSuccess(response.data));
  } catch (error) {
  }
}

export function* watchFetchCoin() {
  yield takeLatest(STORE_FETCH_COIN, fetchCoinSaga);
}

export function* getGameItemsSaga(action) {
  try {
    const response = yield call(storeApi.getGameItems, action.gameId);
    yield put(getGameItemsSuccess(response.data));
  } catch (error) {
  }
}

export function* watchGetGameItems() {
  yield takeLatest(GET_GAME_ITEMS, getGameItemsSaga);
}

export function* purchaseItemsSaga(action) {
  try {
    const response = yield call(storeApi.purchaseItems, action.params);
    yield put(purchaseItemsSuccess(response.data));
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  }
}

export function* watchPurchaseItems() {
  yield takeLatest(PURCHASE_ITEMS, purchaseItemsSaga);
}

export function* getPurchasedItemsSaga(action) {
  try {
    const response = yield call(storeApi.getPurchasedItems);
    yield put(getPurchasedItemsSuccess(response.data));
  } catch (error) {
  }
}

export function* watchGetPurchasedItems() {
  yield takeLatest(GET_PURCHASED_ITEMS, getPurchasedItemsSaga);
}

export function* purchaseEnergySaga(action) {
  try {
    const response = yield call(storeApi.purchaseEnergy, action.receipt, action.transactionId);
    yield put(fetchEnergy());
  } catch (error) {
  }
}

export function* watchPurchaseEnergy() {
  yield takeLatest(PURCHASE_ENERGY, purchaseEnergySaga)
}
