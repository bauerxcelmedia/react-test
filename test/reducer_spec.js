import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
	it('returns the initial state', () => {
		const nextState = reducer(undefined, {});
		// Problem comparing curriedPagedItems functions- remove from state for comparison
		expect(nextState.deleteIn(['paging', 'curriedPagedItems'])).to.equal(Map({
			articleID: null,
			paging: Map({
				displayItems: List(),
				currentPage: 1,
				pageSize: 5,
				lastPage: 1,
				previousAvailable: false,
				nextAvailable: false
			}),
			list: Map({
				items: List(),
				totalListsAdded: 0
			})
		}));
	});

	describe('ADD_LIST', () => {
		let nextState;
		beforeEach(function() {
			const initialState = Map({
				'list': Map({
					items: List.of(1, 2, 3),
					totalListsAdded: 1
				})
			});

			const action = {type: 'ADD_LIST', items: ['A', 'B', 'C', 'D', 'E', 'F', 'G']};
			nextState = reducer(initialState, action);
		});

		it('appends new list to existing list', () => {
			expect(nextState.get('list')).to.equal(Map({items: List.of(1, 2, 3, 'A', 'B', 'C', 'D', 'E', 'F', 'G'), totalListsAdded: 2}));
		});

		it('resets the paging state', () => {
			expect(nextState.get('paging').delete('curriedPagedItems')).to.equal(Map({
				displayItems: List.of(1, 2, 3, 'A', 'B'),
				currentPage: 1,
				pageSize: 5,
				lastPage: 2,
				previousAvailable: false,
				nextAvailable: true
			}));
		});
	});

	describe('PREVIOUS_PAGE', () => {
		let state;
		before(function() {
			const initialState = Map({
				'list': Map({
					items: List.of(1, 2, 3),
					totalListsAdded: 1
				})
			});
			const action = {type: 'ADD_LIST', items: ['A', 'B', 'C', 'D', 'E', 'F', 'G']};
			state = reducer(initialState, action);

			const nextPageAction = {type: 'NEXT_PAGE'};
			while (state.getIn(['paging', 'nextAvailable'])) {      // Go to last page
				state = reducer(state, nextPageAction);
			}
		});

		it('moves to the previous page', () => {
			const action = {type: 'PREVIOUS_PAGE'};
			const nextState = reducer(state, action);

			expect(nextState.deleteIn(['paging', 'curriedPagedItems'])).to.equal(Map({
				list: Map({
					items: List.of(1, 2, 3, 'A', 'B', 'C', 'D', 'E', 'F', 'G'),
					totalListsAdded: 2
				}),
				paging: Map({
					displayItems: List.of(1, 2, 3, 'A', 'B'),
					currentPage: 1,
					pageSize: 5,
					lastPage: 2,
					previousAvailable: false,
					nextAvailable: true
				})
			}));
		});
	});

	describe('NEXT_PAGE', () => {
		let state;
		before(function() {
			const initialState = fromJS({
				'list': {
					items: [1, 2, 3],
					totalListsAdded: 1
				}
			});
			const action = {type: 'ADD_LIST', items: ['A', 'B', 'C', 'D', 'E', 'F', 'G']};
			state = reducer(initialState, action);
		});

		it('moves to the next page', () => {
			const action = {type: 'NEXT_PAGE'};
			const nextState = reducer(state, action);

			expect(nextState.deleteIn(['paging', 'curriedPagedItems'])).to.equal(Map({
				list: Map({
					items: List.of(1, 2, 3, 'A', 'B', 'C', 'D', 'E', 'F', 'G'),
					totalListsAdded: 2
				}),
				paging: Map({
					displayItems: List.of('C', 'D', 'E', 'F', 'G'),
					currentPage: 2,
					pageSize: 5,
					lastPage: 2,
					previousAvailable: true,
					nextAvailable: false
				})
			}));
		});
	});

	describe('TOGGLE_ITEM_SELECTION', () => {
		it('toggles the selection of the item', () => {
			const initialState = Map({'list': List.of(1, 2, 3)});
			const action = {type: 'TOGGLE_ITEM_SELECTION', id: 1};

			let nextState = reducer(initialState, action);
			expect(nextState).to.equal(fromJS({'list': [1, 2, 3], 'articleID': 1})); // Toggle on

			nextState = reducer(nextState, action);
			expect(nextState).to.equal(fromJS({'list': [1, 2, 3], 'articleID': null})); // Toggle off
		});
	});

	describe('UNKNOWN_ACTION', () => {
		it('returns the passed state', () => {
			const initialState = Map({'list': List.of(1, 2, 3)});
			const action = {type: 'UNKNOWN_ACTION', list: ['A', 'B', 'C', 'D', 'E', 'F', 'G']};
			const nextState = reducer(initialState, action);

			expect(nextState).to.equal(initialState);
		});
	});

	describe('scenarios', () => {
		it('tests a comple scenario', () => {
			const actions = [
				{type: 'ADD_LIST', items: [1, 2, 3, 4, 5, 6]},
				{type: 'ADD_LIST', items: ['A', 'B', 'C', 'D', 'E', 'F', 'G']},
				{type: 'NEXT_PAGE'},
				{type: 'NEXT_PAGE'},
				{type: 'PREVIOUS_PAGE'},
				{type: 'TOGGLE_ITEM_SELECTION', id: 11},
				{type: 'TOGGLE_ITEM_SELECTION', id: 12}
			];
			const state = actions.reduce(reducer, Map());

			expect(state.deleteIn(['paging', 'curriedPagedItems'])).to.equal(Map({
				articleID: 12,
				list: Map({
					items: List.of(1, 2, 3, 4, 5, 6, 'A', 'B', 'C', 'D', 'E', 'F', 'G'),
					totalListsAdded: 2
				}),
				paging: Map({
					displayItems: List.of(6, 'A', 'B', 'C', 'D'),
					currentPage: 2,
					pageSize: 5,
					lastPage: 3,
					previousAvailable: true,
					nextAvailable: true
				})
			}));
		});
	});
});