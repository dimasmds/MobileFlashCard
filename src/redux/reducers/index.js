import {
  ADD_CARD_TO_DECK,
  ADD_DECKS,
  RECEIVE_DECKS,
  REMOVE_DECK,
} from '../actions/decks';
import {combineReducers} from 'redux';
import {SET_LOADING} from '../actions/loading';

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_DECKS:
      return {
        ...state,
        [action.deck.title]: {
          ...action.deck,
        },
      };

    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: [...state[action.id].questions, action.card],
        },
      };

    case REMOVE_DECK:
      const newState = {
        ...state,
        [action.id]: undefined,
      };
      delete newState[action.id];
      return newState;

    default:
      return state;
  }
};

const loading = (state = true, action) => {
  if (action.type === SET_LOADING) {
    return action.value;
  } else {
    return state;
  }
};

export default combineReducers({
  decks,
  loading,
});
