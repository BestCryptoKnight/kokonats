import {
  GAME_FETCH_GAME_LIST,
  GAME_FETCH_GAME_LIST_SUCCESS,
  GAME_FETCH_TOURNAMENT_CLASSES,
  GAME_FETCH_TOURNAMENT_CLASSES_SUCCESS,
  GAME_FETCH_TOURNAMENT_PLAYABLE,
  GAME_FETCH_TOURNAMENT_RANKING,
  GAME_FETCH_TOURNAMENT_HISTORY,
  GAME_JOIN_TOURNAMENT,
  GAME_FETCH_GAME_AUTH_TOKEN,
  GAME_FETCH_GAME_PLAY_STATUS,
  GAME_FETCH_GAME_TOURNAMENTS,
  GAME_FETCH_GAME_MATCHES,
  GAME_MATCH_START_SESSION,
  GAME_MATCH_START_PAIRING,
  GAME_FETCH_MATCH_RESULT,
} from "./types";

export const fetchTournamentClasses = () => ({
  type: GAME_FETCH_TOURNAMENT_CLASSES
});

export const fetchTournamentClassesSuccess = (tournaments) => ({
  type: GAME_FETCH_TOURNAMENT_CLASSES_SUCCESS,
  tournaments
});

export const fetchGameList = () => ({
  type: GAME_FETCH_GAME_LIST
});

export const fetchGameListSuccess = (games) => ({
  type: GAME_FETCH_GAME_LIST_SUCCESS,
  games
});

export const fetchTournamentPlayable = (tournamentClassId, onSuccess, onFail) => ({
  type: GAME_FETCH_TOURNAMENT_PLAYABLE,
  tournamentClassId,
  onSuccess,
  onFail
});

export const fetchTournamentRanking = (tournamentId, onSuccess, onFail) => ({
  type: GAME_FETCH_TOURNAMENT_RANKING,
  tournamentId,
  onSuccess,
  onFail
});

export const fetchTournamentHistory = (tournamentClassId, onSuccess, onFail) => ({
  type: GAME_FETCH_TOURNAMENT_HISTORY,
  tournamentClassId,
  onSuccess,
  onFail
});

export const joinTournament = (playableTournamentId, onSuccess, onFail) => ({
  type: GAME_JOIN_TOURNAMENT,
  playableTournamentId,
  onSuccess,
  onFail
});

export const fetchGameAuthToken = (gameId, onSuccess, onFail) => ({
  type: GAME_FETCH_GAME_AUTH_TOKEN,
  gameId,
  onSuccess,
  onFail
});

export const fetchGamePlayStatus = (playType, playId, subscriber, onSuccess, onFail) => ({
  type: GAME_FETCH_GAME_PLAY_STATUS,
  playType,
  playId,
  subscriber,
  onSuccess,
  onFail
});

export const fetchGameTournaments = (gameId, onSuccess, onFail) => ({
  type: GAME_FETCH_GAME_TOURNAMENTS,
  gameId,
  onSuccess,
  onFail
});

export const fetchGameMatches = (gameId, onSuccess, onFail) => ({
  type: GAME_FETCH_GAME_MATCHES,
  gameId,
  onSuccess,
  onFail
});

export const startMatchSession = (matchId, onSuccess, onFail) => ({
  type: GAME_MATCH_START_SESSION,
  matchId,
  onSuccess,
  onFail
});

export const startMatchPairing = (sessionId, onSuccess, onFail) => ({
  type: GAME_MATCH_START_PAIRING,
  sessionId,
  onSuccess,
  onFail
});

export const fetchMatchResult = (matchPlayId, onSuccess, onFail) => ({
  type: GAME_FETCH_MATCH_RESULT,
  matchPlayId,
  onSuccess,
  onFail
});
