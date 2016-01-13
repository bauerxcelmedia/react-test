import {toggleItemSelection, setSelectedItem, INITIAL_STATE} from '../actions/itemActions';

export const itemReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'TOGGLE_ITEM_SELECTION':
			return toggleItemSelection(state, action.id);
		case 'SET_SELECTED_ITEM':
			return setSelectedItem(state, action.id);
		default:
			return state;
	}
};