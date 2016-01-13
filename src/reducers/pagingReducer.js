import {setup, previousPage, nextPage, setPage, INITIAL_STATE} from '../actions/pagingActions';

export const pagingReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SETUP':
			return setup(state, action.list);
		case 'PREVIOUS_PAGE':
			return previousPage(state);
		case 'NEXT_PAGE':
			return nextPage(state);
		case 'SET_PAGE':
			return setPage(state, action.pageNumber);
		default:
			return state;
	}
};