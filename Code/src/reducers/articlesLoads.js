import {INITIALIZE,SHOW_MORE,STOP_SHOW_MORE} from '../constants/ActionTypes';
import articleApi from '../api/articleApi';

const initialState = {
    page: 1,
    disabled: false,
    articles: []
};

// Implementation logics for actions
export default function articlesLoadsAppState(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE:
            let newState = Object.assign({}, state);
            newState[action.fieldName] = action.value;
            let articlesRes = articleApi.getArticlesPage(state.page);
            newState.articles = articlesRes.articles;
            newState.disabled = articlesRes.disableBtn;
            return newState;

        case SHOW_MORE:
            let newStateMore = Object.assign({}, state);
            newStateMore[action.fieldName] = action.value;
            let articlesResMore = articleApi.getArticlesPage(state.page);
            newStateMore.articles = state.articles.concat(articlesResMore.articles);
            newStateMore.disabled = articlesResMore.disableBtn;

            return newStateMore;

        default:
            return state;
    }
}
