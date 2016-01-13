import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';
import {createStore} from 'redux';
import reducer from '../src/reducer';

describe('store', () => {
	it('is a Redux store configured with the correct reducer', () => {
		const store = createStore(reducer);
		// Problem comparing curriedPagedItems functions - removed from state
		expect(store.getState().deleteIn(['paging', 'curriedPagedItems'])).to.equal(Map({
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

		store.dispatch({
			type: 'ADD_LIST',
			items: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
		});

		expect(store.getState().deleteIn(['paging', 'curriedPagedItems'])).to.equal(fromJS({
			articleID: null,
			paging:{
				displayItems: ['A', 'B', 'C', 'D', 'E'],
				currentPage: 1,
				pageSize: 5,
				lastPage: 2,
				previousAvailable: false,
				nextAvailable: true
			},
			list: {
				items: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
				totalListsAdded: 1
			}
		}));
	});
});