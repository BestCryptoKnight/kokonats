import { api } from "./api";

export const signIn = params => {
  return api.post(params.url, params.params);
}

export const fetchUserInfo = () => {
  return api.get(`user/info`)
}

export const fetchBlockList = () => {
  return api.get(`chat/block/users`);
}

export const updateUserInfo = (params) => {
  return api.post(`user/info`, params);
}

export const getUserTournamentHistory = () => {
  return api.get(`user/tournament/plays`);
}

export const registerFCMToken = (params) => {
  return api.post(`user/device/register`, params);
}

export const blockUser = (userId) => {
  return api.post(`chat/block/create`, {blockedUserId: userId});
}

export const unblockUser = (userId) => {
  return api.delete(`chat/block/delete`, {data: {blockedUserId: userId}});
}
