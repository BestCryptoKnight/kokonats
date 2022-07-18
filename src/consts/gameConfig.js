export const PlayType = {
  tournament: {
    label: "game.tournament",
    name: "tournament"
  },
  match: {
    label: "game.pvp",
    name: "match"
  },
  practise: {
    label: "game.practise",
    name: "practise"
  }
};

export const TournamentStatus = {
  playable: ".playable",
  finished: ".finished",
  notStartedYet: ".notStartedYet",
  full: ".full"
};

export const RankingColors = [
  'rgba(239, 93, 168, 1)',
  'rgba(241, 120, 182, 1)',
  'rgba(252, 221, 236, 0.5)',
  'rgba(72, 112, 255, 0.1)'
];

export const GAME_TOURNAMENT_PLAY_COLLECTION = "dev-tournamentPlay";
export const GAME_MATCH_PLAY_COLLECTION = "dev-matchPlay";
export const GAME_MATCH_SESSION_COLLECTION = "dev-matchingSessions";
