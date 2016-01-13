import { addList, INITIAL_STATE } from '../actions/listActions';

export const listReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'ADD_LIST':
			return addList(state, action.items);
		default:
			return state;
	}
};
