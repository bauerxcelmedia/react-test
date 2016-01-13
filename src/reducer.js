import {UPDATE_PATH} from 'redux-simple-router';
import {pagingReducer} from './reducers/pagingReducer';
import {listReducer} from './reducers/listReducer';
import {itemReducer} from './reducers/itemReducer';
import {INITIAL_STATE} from './actions/CombinedInitialState';

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_PATH:
			const {pageNumber, articleID} = extractPageNumberAndSelectedItem(action.payload.path);
			return state.update('paging', paging => pagingReducer(paging, {
				type: 'SET_PAGE',
				pageNumber
			})).update('articleID', selected => itemReducer(selected, {
				type: 'SET_SELECTED_ITEM',
				id: articleID
			}));
		case 'ADD_LIST':
			const listState = listReducer(state.get('list'), action);
			return state.update('paging', paging => pagingReducer(paging, {type: 'SETUP', list: listState}))
				.set('list', listState);
		case 'PREVIOUS_PAGE':
		case 'NEXT_PAGE':
		case 'SET_PAGE':
			return state.update('paging', paging => pagingReducer(paging, action));
		case 'SET_SELECTED_ITEM':
		case 'TOGGLE_ITEM_SELECTION':
			return state.update('articleID', articleID => itemReducer(articleID, action));
		default:
			return state;
	}
};

// Extract the page number and the selected item from the url e.g. /page/1?articleID=5 => {1, 5}
function extractPageNumberAndSelectedItem(path) {
	const [, pageNumber, articleID] = path.match(/\/page\/(\d+)(?:\?.*?articleID=)?(\d*)/);
	return {
		pageNumber: pageNumber ? Number(pageNumber) : INITIAL_STATE.getIn(['paging', 'currentPage']),
		articleID: articleID ? Number(articleID) : INITIAL_STATE.get('articleID')
	};
}