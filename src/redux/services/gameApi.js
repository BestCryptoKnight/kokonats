import { api } from "./api";
import firestore from "@react-native-firebase/firestore";
import {
  GAME_MATCH_PLAY_COLLECTION,
  GAME_MATCH_SESSION_COLLECTION,
  GAME_TOURNAMENT_PLAY_COLLECTION,
  PlayType,
} from "../../consts/gameConfig";

export const fetchTournamentClasses = () => {
  return api.get(`tournamentClass`);
};

export const fetchGameList = () => {
  return api.get(`game/list`);
};

export const fetchTournamentPlayable = (tournamentClassId) => {
  return api.get(`tournamentClass/${tournamentClassId}/tournament`);
};

export const fetchTournamentRanking = (tournamentId) => {
  return api.get(`tournament/${tournamentId}/plays`);
};

export const fetchTournamentHistory = (tournamentClassId) => {
  return api.get(`tournamentClass/${tournamentClassId}/history`);
};

export const joinTournament = (playableTournamentId) => {
  return api.post(`user/tournament/play`, { tournamentId: playableTournamentId });
};

export const fetchGameAuthToken = (gameId) => {
  return api.post(`user/game/auth`, { gameId: gameId });
};

export const fetchGamePlayStatus = async (playType, playId, subscriber) => {
  const document = await firestore()
    .collection(playType === PlayType.match ? GAME_MATCH_PLAY_COLLECTION : GAME_TOURNAMENT_PLAY_COLLECTION)
    .doc(`${playId}_${subscriber}`)
    .get();
  return document.data().state;
};

export const fetchGameTournaments = async (gameId) => {
  return api.get(`game/${gameId}/tournaments`);
};

export const fetchGameMatches = async (gameId) => {
  return api.get(`game/${gameId}/matches`);
};

export const startMatchSession = async (matchId) => {
  return api.post(`matchClass/${matchId}/session`);
};

export const startMatchPairing = async (sessionId) => {
  return await startPairing(sessionId, 60);
};

const startPairing = async (sessionId, retry) => {
  const data = (await firestore().collection(GAME_MATCH_SESSION_COLLECTION).doc(sessionId).get()).data();
  const state = data.state;
  if (state) {
    if (state === 0 || state === 1) {
      if (retry === 0) return null;
      return await startPairing(sessionId, retry - 1);
    } else {
      const matchPlayId = data.matchPlayId;
      if (matchPlayId) {
        const users = data.matchingUsers;
        if (users) {
          return {matchPlayId, users};
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
};
