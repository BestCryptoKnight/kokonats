import Immutable from 'seamless-immutable';
import {
  CHAT_FETCH_THREAD_UNREAD_MESSAGE_COUNT_SUCCESS,
  CHAT_FETCH_THREADS_SUCCESS,
  SIGN_OUT_SUCCESS,
} from "../actions/types";
import { ChatType } from "../../consts/chatConfig";

const INITIAL_STATE = Immutable({
  publicThreads: [],
  dmThreads: [],
  csThreads: [],
  unreadMessages: {},
});

const storeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_OUT_SUCCESS:
      return INITIAL_STATE;
    case CHAT_FETCH_THREADS_SUCCESS:
      switch (action.chatType) {
        case ChatType.Room:
          return state.merge({
            publicThreads: action.threads,
          }, {deep: true});
        case ChatType.DM:
          return state.merge({
            dmThreads: action.threads,
          }, {deep: true});
        case ChatType.CS:
          return state.merge({
            csThreads : action.threads,
          }, {deep: true});
        default:
          return state.merge({
            publicThreads : action.threads,
          }, {deep: true});
      }
    case CHAT_FETCH_THREAD_UNREAD_MESSAGE_COUNT_SUCCESS:
      let unreadMessageCounts = {...state.unreadMessages};
      unreadMessageCounts[action.threadID] = action.count;
      return state.merge({
        unreadMessages: unreadMessageCounts
      }, {deep: true});
    default:
      return state;
  }
}

export default storeReducer;
