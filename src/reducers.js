import { combineReducers } from 'redux';

import {
  SELECT_LEMMA,
  REQUEST_ARTICLES,
  RECEIVE_ARTICLES,
  REQUEST_ITEMS,
  RECEIVE_ITEMS
} from './actions';

function selectedLemma (state = '', action) {
  switch (action.type) {
    case SELECT_LEMMA:
      return action.lemma;
    default:
      return state;
  }
}

function articles (
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_ARTICLES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.articles
      });
    default:
      return state;
  }
}

function articlesByLemma (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ARTICLES:
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        [action.lemma]: articles(state[action.lemma], action)
      });
    default:
      return state;
  }
}

function setUnion (thisSet, thatSet) {
  let result = new Set();

  thisSet.forEach((item) => {
    result.add(item);
  });

  if (thatSet) {
    thatSet.forEach((item) => {
      result.add(item);
    });
  }

  return result;
}
function search (
  state = {
    isSearching: false,
    usedSearchKeys: new Set(),
    searchItems: new Set()
  },
  action
) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        isSearching: true
      });
    case RECEIVE_ITEMS:
      return Object.assign({}, state, {
        isSearching: false,
        usedSearchKeys: state.usedSearchKeys.add(action.key),
        searchItems: setUnion(state.searchItems, action.searchItems)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  articlesByLemma,
  selectedLemma,
  search
});

export default rootReducer;
