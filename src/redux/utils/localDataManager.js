import { clear, getData, setData } from "./storage";
import { setAuthorization } from "../services/api";

const ID_TOKEN = "ID_TOKEN";
const USER_ID = "USER_ID";
const LAUNCHED_BEFORE = "LAUNCHED_BEFORE";
const FCM_TOKEN = "FCM_TOKEN";

export const saveIdToken = async (token) => {
  return await setData(ID_TOKEN, token);
};

export const getIdToken = async () => {
  return await getData(ID_TOKEN);
}

export const saveFCMToken = async (token) => {
  return await setData(FCM_TOKEN, token);
};

export const getFCMToken = async () => {
  return await getData(FCM_TOKEN);
};

export const isLoggedIn = async () => {
  const idToken = await getIdToken();
  if (idToken) setAuthorization(idToken);
  return !!idToken;
}

export const setLaunched = async () => {
  return await setData(LAUNCHED_BEFORE, true);
};

export const isFirstLaunch = async () => {
  const launchedBefore = await getData(LAUNCHED_BEFORE);
  return launchedBefore !== true;
};

export const saveUserId = async (id) => {
  return await setData(USER_ID, id);
};

export const getUserId = async () => {
  return await getData(USER_ID);
};

export const clearAppData = async () => {
  return await clear();
};
