import Immutable from 'seamless-immutable';
import {
  GET_GAME_ITEMS_SUCCESS,
  GET_PURCHASED_ITEMS_SUCCESS,
  PURCHASE_ITEMS_SUCCESS,
  SIGN_OUT_SUCCESS,
  STORE_FETCH_COIN_SUCCESS,
  STORE_FETCH_ENERGY_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = Immutable({
  purchasedItems: [],
  items: [],
  energy: 0,
  coin: 0
});

const storeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_OUT_SUCCESS:
      return INITIAL_STATE;
    case STORE_FETCH_ENERGY_SUCCESS:
      return state.merge({
        energy: action.energy
      }, { deep: true });
    case STORE_FETCH_COIN_SUCCESS:
      return state.merge({
        coin: action.coin
      }, { deep: true });
    case GET_GAME_ITEMS_SUCCESS:
      return state.merge({
        items: action.items
      }, { deep: true });
    case PURCHASE_ITEMS_SUCCESS:
      return state.merge({
        items: action.items
      }, { deep: true });
    case GET_PURCHASED_ITEMS_SUCCESS:
      return state.merge({
        purchasedItems: action.params
      }, { deep: true });
    default:
      return state;
  }
}

export default storeReducer;
