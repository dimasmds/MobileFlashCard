import {AsyncStorage} from 'react-native';
import decks from './_DATA';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

const fetchDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        if (!results) {
          AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
        }
        return results ? JSON.parse(results) : decks;
      });
};

const removeDeckById = (id) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results);
        data[id] = undefined;
        delete data[id];
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
      });
};

const addDeck = (name) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const newDeck = {
          ...JSON.parse(results),
          [name]: {
            title: name,
            questions: [],
          },
        };
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
        return newDeck[name];
      });
};

const addCardToDecks = (id, answer, question) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const newDeck = {
          ...JSON.parse(results),
          [id]: {
            ...JSON.parse(results)[id],
            questions: [...JSON.parse(results)[id].questions, {answer, question}],
          },
        };
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
        return {answer, question};
      });
};


export {fetchDecks, removeDeckById, addCardToDecks, addDeck};
