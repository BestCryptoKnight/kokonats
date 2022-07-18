import {
  GET_GAME_ITEMS,
  GET_GAME_ITEMS_SUCCESS,
  GET_PURCHASED_ITEMS,
  GET_PURCHASED_ITEMS_SUCCESS, PURCHASE_ENERGY,
  PURCHASE_ITEMS,
  PURCHASE_ITEMS_SUCCESS,
  STORE_FETCH_COIN,
  STORE_FETCH_COIN_SUCCESS,
  STORE_FETCH_ENERGY,
  STORE_FETCH_ENERGY_SUCCESS,
} from "./types";

export const fetchEnergy = () => ({
  type: STORE_FETCH_ENERGY,
});

export const fetchEnergySuccess = (energy) => ({
  type: STORE_FETCH_ENERGY_SUCCESS,
  energy
});

export const fetchCoin = () => ({
  type: STORE_FETCH_COIN
});

export const fetchCoinSuccess = (coin) => ({
  type: STORE_FETCH_COIN_SUCCESS,
  coin
});

export const getGameItems = (gameId) => ({
  type: GET_GAME_ITEMS,
  gameId
});
export const getGameItemsSuccess = (items) => ({
  type: GET_GAME_ITEMS_SUCCESS,
  items
});

export const purchaseItems = ({ params, onSuccess, onFail }) => ({
  type: PURCHASE_ITEMS,
  params,
  onSuccess,
  onFail
});
export const purchaseItemsSuccess = (params) => ({
  type: PURCHASE_ITEMS_SUCCESS,
  params
});

export const getPurchasedItems = () => ({
  type: GET_PURCHASED_ITEMS,
});
export const getPurchaseItemsSuccess = (params) => ({
  type: GET_PURCHASED_ITEMS_SUCCESS,
  params
});

export const purchaseEnergy = (receipt, transactionId) => ({
  type: PURCHASE_ENERGY,
  receipt,
  transactionId
});
