import { api } from "./api";
import { Platform } from "react-native";

export const fetchEnergy = () => {
  return api.get(`energy/balance`);
}

export const fetchCoin = () => {
  return api.get(`wallet/balance`);
}

export const getGameItems = (gameId) => {
  return api.get('game/' + gameId + '/items');
}

export const purchaseItems = (params) => {
  return api.post('user/consume/item', params);
}

export const getPurchasedItems = () => {
  return api.get('user/consume/item');
}

export const purchaseEnergy = (receipt, transactionId) => {
  return api.post(`energy/purchase`, {
    platform: Platform.OS,
    receipt,
    transactionId
  })
}
