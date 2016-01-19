import * as types from '../constants/ActionTypes';

export function initializeArticleList(settings) {
    return { type: types.INITIALIZE, settings };
}

export function loadArticlesPage(settings) {
    return { type: types.SHOW_MORE, settings };
}