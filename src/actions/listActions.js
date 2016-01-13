import {List, Map} from 'immutable';

export const INITIAL_STATE = Map({
	items: List(),
	totalListsAdded: 0
});

export function addList(state, addItems) {
	return !addItems ? state :
		state.update('items', items => items.push(...addItems))
		.update('totalListsAdded', totalListsAdded => totalListsAdded + 1);
}