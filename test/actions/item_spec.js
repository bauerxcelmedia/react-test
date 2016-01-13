import {expect} from 'chai';

import {toggleItemSelection} from '../../src/actions/itemActions';

describe('item actions', () => {
	describe('toggleItemSelection', () => {
		it('sets the selected item when current selection is null', () => {
			const state = null;
			const selectedItemID = 1;
			const nextState = toggleItemSelection(state, selectedItemID);

			expect(nextState).to.equal(selectedItemID);
		});

		it('sets the selected item when current selection is undefined', () => {
			const state = undefined;
			const selectedItemID = 1;
			const nextState = toggleItemSelection(state, selectedItemID);

			expect(nextState).to.equal(selectedItemID);
		});

		it('sets the selected item when not currently selected', () => {
			const state = 2;
			const selectedItemID = 1;
			const nextState = toggleItemSelection(state, selectedItemID);

			expect(nextState).to.equal(selectedItemID);
		});

		it('unsets the selected item when currently selected', () => {
			const state = 1;
			const selectedItemID = 1;
			const nextState = toggleItemSelection(state, selectedItemID);

			expect(nextState).to.be.null;
		});
	});
});