// Auth
export const getUserInfo = state => state.auth.me;
export const getUserTnmtHistory = state => state.auth.history;
export const getHistoryTags = params => {
  const tnmtNames = Array.from(new Set(params.map(history => history.tournamentName)));
  let result = [];
  const allObj = {};
  allObj.label = "All";
  allObj.value = 1;
  result.push(allObj)
  let index = 1;
  tnmtNames.forEach(value => {
    const tmpObj = {};
    tmpObj.label = value < 7 ? value : value.substring(0, 5) + '...';
    index++;
    tmpObj.value = index.toString();
    result.push(tmpObj)
  });
  return result;
}
export const getBlockedUsers = state => state.auth.blockedUsers;
export const getPurchasedItems = state => state.store.purchasedItems;

// Store
export const getEnergyBalance = state => state.store.energy;
export const getCoinBalance = state => state.store.coin.confirmed ?? 0;
export const getGameItemsList = state => state.store.items;

// Game
export const getTournamentClasses = state => state.game.tournaments;
export const getGameList = state => state.game.games;
export const getGameCategories = state => {
  const categories = Array.from(new Set(state.game.games.map(game => game.category)));
  let result = [];
  categories.forEach(value => result.push(...value.split(', ')));
  return Array.from(new Set(result));
};
export const getTournamentTags = state => {
  const tags = Array.from(new Set(state.game.tournaments.map(tnmt => tnmt.tag)));
  let result = [];
  tags.forEach(value => result.push(...value.split(', ')));
  return Array.from(new Set(result));
};

// Chat
export const getPublicThreads = state => state.chat.publicThreads;
export const getDMThreads = state => state.chat.dmThreads;
export const getCSThreads = state => state.chat.csThreads;
export const getUnreadCount = state => state.chat.unreadMessages;


