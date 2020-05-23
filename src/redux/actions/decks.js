import {
  addCardToDecks,
  addDeck,
  fetchDecks,
  removeDeckById,
} from '../../utils/api';
import {setLoading} from './loading';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECKS = 'ADD_DECKS';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

const _receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
};

const _addDeck = (deck) => {
  return {
    type: ADD_DECKS,
    deck,
  };
};

const _addCardToDeck = (id, card) => {
  return {
    type: ADD_CARD_TO_DECK,
    id,
    card,
  };
};

const _removeDeck = (id) => {
  return {
    type: REMOVE_DECK,
    id,
  };
};

const handleInitialData = () => (dispatch) => {
  dispatch(setLoading(true));
  return fetchDecks().then((decks) => {
    dispatch(_receiveDecks(decks));
    dispatch(setLoading(false));
  });
};

const handleAddDeck = (name, callback) => (dispatch) => {
  dispatch(setLoading(true));
  return addDeck(name).then((deck) => {
    dispatch(_addDeck(deck));
    dispatch(setLoading(false));
  }).then(() => callback());
};

const handleAddCard = (id, answer, question) => (dispatch) => {
  dispatch(setLoading(true));
  return addCardToDecks(id, answer, question).then((card) => {
    dispatch(_addCardToDeck(id, card));
    dispatch(setLoading(false));
  });
};

const handleRemoveDeck = (id) => (dispatch) => {
  dispatch(setLoading(true));
  return removeDeckById(id).then(() => {
    dispatch(_removeDeck(id));
    dispatch(setLoading(false));
  });
};


export {handleRemoveDeck, handleAddDeck, handleInitialData, handleAddCard};
