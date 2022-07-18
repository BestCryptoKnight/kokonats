import {
  CHAT_BLOCK_CHECK,
  CHAT_FETCH_THREAD_MESSAGES, CHAT_FETCH_THREAD_UNREAD_MESSAGE_COUNT, CHAT_FETCH_THREAD_UNREAD_MESSAGE_COUNT_SUCCESS,
  CHAT_FETCH_THREADS,
  CHAT_FETCH_THREADS_SUCCESS, CHAT_SEND_MESSAGE,
  CHAT_SET_THREAD_READ_AT,
} from "./types";

export const fetchChatThreads = (chatType) => ({
  type: CHAT_FETCH_THREADS,
  chatType
});

export const fetchChatThreadsSuccess = (chatType, threads) => ({
  type: CHAT_FETCH_THREADS_SUCCESS,
  chatType,
  threads
});

export const fetchChatThreadMessages = (threadID, onSuccess, onFail) => ({
  type: CHAT_FETCH_THREAD_MESSAGES,
  threadID,
  onSuccess,
  onFail
});

export const setThreadReadAt = (threadID) => ({
  type: CHAT_SET_THREAD_READ_AT,
  threadID
});

export const fetchThreadUnreadMessageCount = (threadID) => ({
  type: CHAT_FETCH_THREAD_UNREAD_MESSAGE_COUNT,
  threadID
});

export const fetchThreadUnreadMessageCountSuccess = (threadID, count) => ({
  type: CHAT_FETCH_THREAD_UNREAD_MESSAGE_COUNT_SUCCESS,
  threadID,
  count
});

export const sendMessage = (threadID, body, user, onSuccess) => ({
  type: CHAT_SEND_MESSAGE,
  threadID,
  body,
  user,
  onSuccess
});

export const checkBlocked = (userId, onSuccess, onFail) => ({
  type: CHAT_BLOCK_CHECK,
  userId,
  onSuccess,
  onFail
});
