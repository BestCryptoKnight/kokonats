import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import storeReducer from "./storeReducer";
import gameReducer from "./gameReducer";
import chatReducer from "./chatReducer";

const reducers = combineReducers({
  auth: authReducer,
  store: storeReducer,
  game: gameReducer,
  chat: chatReducer
});

export default reducers;
