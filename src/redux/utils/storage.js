import AsyncStorage from '@react-native-community/async-storage';

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}:key`, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const getData = async key => {
  try {
    const data = await AsyncStorage.getItem(`@${key}:key`);
    const parsedData = JSON.parse(data);
    if (parsedData !== null) {
      return parsedData;
    }
    return parsedData;
  } catch (error) {
    return null;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(`@${key}:key`);
    return true;
  } catch (error) {
    return false;
  }
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};
