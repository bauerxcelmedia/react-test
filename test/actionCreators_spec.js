// Test that the correct action creator is called and that the correct action is returned
import {expect} from 'chai';
import * as actions from '../src/actionCreators';

describe('action creators', () => {
	it('creates an action to add items to the list', () => {
		const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
		const action = {
			type: 'ADD_LIST',
			items
		};
		expect(actions.addList(items)).to.eql(action);
	});

	it('creates an action to move to te previous page', () => {
		const action = {
			type: 'PREVIOUS_PAGE'
		};
		expect(actions.previousPage()).to.eql(action);
	});

	it('creates an action to move to te next page', () => {
		const action = {
			type: 'NEXT_PAGE'
		};
		expect(actions.nextPage()).to.eql(action);
	});

	it('creates an action to toggle a selected item', () => {
		const id = 7;
		const action = {
			type: 'TOGGLE_ITEM_SELECTION',
			id
		};
		expect(actions.toggleItemSelection(id)).to.eql(action);
	});
});