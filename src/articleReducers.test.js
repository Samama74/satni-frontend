import {OrderedSet, Set} from 'immutable';

import { articlesByLemma } from './articleReducers';
import * as actions from './articleActions';

const initialState = {};

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(articlesByLemma(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_ARTICLES_BEGIN', () => {
    expect(articlesByLemma({},
      actions.fetchArticlesBegin('guolli'))).toEqual({
        isFetching: true,
        errorMessage: null,
        'guolli': []
      });
  });

  it('should handle FETCH_ARTICLES_SUCCESS', () => {
    const inputArticles = [
      {
        'term': 'guolli',
        'pos': 'N',
        'dict': 'termwiki',
        'status': null,
        'category': 'Luonddudieđa ja matematihkka',
        'termwikiref': 'Luonddudieđa ja matematihkka:guolli',
        'def': null,
        'expl': null,
        'tg': [
          {
            'xml:lang': 'nb',
            '#text': [
              '\n      ',
              '\n    '
            ],
            't': {
              'pos': 'N',
              '#text': 'fisk'
            }
          },
          {
            'xml:lang': 'se',
            '#text': [
              '\n      ',
              '\n    '
            ],
            't': {
              'pos': 'N',
              '#text': 'guolli'
            }
          },
          {
            'xml:lang': 'sma',
            '#text': [
              '\n      ',
              '\n    '
            ],
            't': {
              'pos': 'N',
              '#text': 'guelie'
            }
          },
          {
            'xml:lang': 'smj',
            '#text': [
              '\n      ',
              '\n    '
            ],
            't': {
              'pos': 'N',
              '#text': 'guolle'
            }
          },
          {
            'xml:lang': 'smn',
            '#text': [
              '\n      ',
              '\n    '
            ],
            't': {
              'pos': 'N',
              '#text': 'kyeli'
            }
          },
          {
            'xml:lang': 'fi',
            '#text': [
              '\n      ',
              '\n    '
            ],
            't': {
              'pos': 'N',
              '#text': 'kala'
            }
          }
        ]
      }
    ];

    const resultArticles = {
      isFetching: false,
      errorMessage: null,
      'guolli': [
        {
          'category': 'Luonddudieđa ja matematihkka',
          'def': null,
          'dict': 'termwiki',
          'expl': null,
          'pos': 'N',
          'status': null,
          'term': 'guolli',
          'termwikiref': 'Luonddudieđa ja matematihkka:guolli',
          'tg': [
            {
              '#text': ['\n      ', '\n    '],
              't': {'#text': 'fisk', 'pos': 'N'}, 'xml:lang': 'nb'
            },
            {
              '#text': ['\n      ', '\n    '],
              't': {'#text': 'guolli', 'pos': 'N'}, 'xml:lang': 'se'
            },
            {
              '#text': ['\n      ', '\n    '],
              't': {'#text': 'guelie', 'pos': 'N'}, 'xml:lang': 'sma'
            },
            {
              '#text': ['\n      ', '\n    '],
              't': {'#text': 'guolle', 'pos': 'N'}, 'xml:lang': 'smj'
            },
            {
              '#text': ['\n      ', '\n    '],
              't': {'#text': 'kyeli', 'pos': 'N'}, 'xml:lang': 'smn'
            },
            {
              '#text': ['\n      ', '\n    '],
              't': {'#text': 'kala', 'pos': 'N'}, 'xml:lang': 'fi'
            }
          ]
        }
      ]
    };

    expect(articlesByLemma({
      'guolli': []},
    actions.fetchArticlesSuccess('guolli', inputArticles))).toEqual(resultArticles);
  });

  it('should handle FETCH_ARTICLES_FAILURE', () => {
    expect(articlesByLemma({},
      actions.fetchArticleFailure('guolli', 'Error'))).toEqual({
        isFetching: false,
        errorMessage: 'Error',
        'guolli': []
      });
  });
});