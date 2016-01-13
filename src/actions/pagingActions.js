import {List, Map} from 'immutable';

export const INITIAL_STATE = Map({
	displayItems: List(),
	currentPage: 1,
	pageSize: 5,
	lastPage: 1,
	previousAvailable: false,
	nextAvailable: false,
	curriedPagedItems: () => List()
});

export function setup(state, list) {
	const items = list && list.get('items');
	const curriedPagedItems = (items, pageSize) => (page) => {
		return items ? items.skip((page - 1) * pageSize).take(pageSize) : List();
	};

	const currentPage = state.get('currentPage') || INITIAL_STATE.get('currentPage');
	const pageSize = state.get('pageSize') || 1;
	const lastPage = items ? Math.ceil(items.size / pageSize) : 1;
	const pagedItems = curriedPagedItems(items, pageSize);

	const setupState = state.set('curriedPagedItems', pagedItems)
		.set('lastPage', lastPage);
	return updateState(setupState, currentPage);
}

export function previousPage(state) {
	return updateState(state, state.get('currentPage') - 1);
}

export function nextPage(state) {
	return updateState(state, state.get('currentPage') + 1);
}

export function setPage(state, pageNumber) {
	return updateState(state, pageNumber);
}

function updateState(state, pageNumber) {
	const lastPage = state.get('lastPage');
	const pagedItems = state.get('curriedPagedItems')(pageNumber);

	return state.set('currentPage', pageNumber)
		.set('displayItems', pagedItems)
		.set('previousAvailable', pageNumber > 1)
		.set('nextAvailable', pageNumber < lastPage);
}