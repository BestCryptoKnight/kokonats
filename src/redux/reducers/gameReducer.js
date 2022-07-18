import Immutable from 'seamless-immutable';
import { GAME_FETCH_GAME_LIST_SUCCESS, GAME_FETCH_TOURNAMENT_CLASSES_SUCCESS } from "../actions/types";

const INITIAL_STATE = Immutable({
  tournaments: [],
  games: [],
});

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GAME_FETCH_TOURNAMENT_CLASSES_SUCCESS:
      return state.merge({
        tournaments: action.tournaments
      }, {deep: true});
    case GAME_FETCH_GAME_LIST_SUCCESS:
      return state.merge({
        games: action.games
      }, {deep: true});
    default:
      return state;
  }
}

export default gameReducer;
