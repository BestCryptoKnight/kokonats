export const calcUnreadMessagesThreads = (unreads, threads) => {
  let result = 0;
  const threadIDs = Object.keys(unreads);
  threadIDs.forEach(threadID => {
    if (threads && threads.length > 0) {
      if (threads.includes(threadID)) result += unreads[threadID];
    } else {
      result += unreads[threadID];
    }
  });
  return result;
}
