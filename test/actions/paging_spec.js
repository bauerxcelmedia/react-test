import {List, Map} from 'immutable';
import {expect} from 'chai';
import {INITIAL_STATE, setup, previousPage, nextPage} from '../../src/actions/pagingActions';

describe('paging actions', () => {
	describe('setup using default initial state', () => {
		let initialState;
		beforeEach(function() {
			initialState = INITIAL_STATE;
		});

		it('add null list', () => {
			const list = null;
			const nextState = setup(initialState, list);

			expect(nextState.get('displayItems')).to.equal(List());
			expect(nextState.get('currentPage')).to.equal(1);
			expect(nextState.get('lastPage')).to.equal(1);
			expect(nextState.get('previousAvailable')).to.be.false;
			expect(nextState.get('nextAvailable')).to.be.false;
		});

		it('add list with 1 item', () => {
			const list = Map({
				items: List.of('A'),
				totalListsAdded: 1
			});
			const nextState = setup(initialState, list);

			expect(nextState.get('displayItems')).to.equal(List.of('A'));
			expect(nextState.get('currentPage')).to.equal(1);
			expect(nextState.get('lastPage')).to.equal(1);
			expect(nextState.get('previousAvailable')).to.be.false;
			expect(nextState.get('nextAvailable')).to.be.false;
		});

		it('add list with multiple items', () => {
			const list = Map({
				items: List.of('A', 'B'),
				totalListsAdded: 1
			});
			const nextState = setup(initialState, list);

			expect(nextState.get('displayItems')).to.equal(List.of('A', 'B'));
			expect(nextState.get('currentPage')).to.equal(1);
			expect(nextState.get('lastPage')).to.equal(1);
			expect(nextState.get('previousAvailable')).to.be.false;
			expect(nextState.get('nextAvailable')).to.be.false;
		});
	});

	describe('setup overriding default initial state', () => {
		let initialState;

		beforeEach(function() {
			initialState = Map({
				displayItems: List.of('A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K'),
				pageSize: 3
			});
		});

		it('add null items overrides existing items', () => {
			const list = null;
			const nextState = setup(initialState, list);

			expect(nextState.get('displayItems')).to.equal(List());
			expect(nextState.get('pageSize')).to.equal(3);
			expect(nextState.get('currentPage')).to.equal(1);
			expect(nextState.get('lastPage')).to.equal(1);
			expect(nextState.get('previousAvailable')).to.be.false;
			expect(nextState.get('nextAvailable')).to.be.false;
		});

		it('should only contain the first page of items', () => {
			const list = Map({
				items: List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
				totalListsAdded: 1
			});
			const nextState = setup(initialState, list);

			expect(nextState.get('displayItems')).to.equal(List.of(1, 2, 3));   // Only first 3 items
			expect(nextState.get('pageSize')).to.equal(3);
			expect(nextState.get('currentPage')).to.equal(1);
			expect(nextState.get('lastPage')).to.equal(4);
			expect(nextState.get('previousAvailable')).to.be.false;
			expect(nextState.get('nextAvailable')).to.be.true;
		});
	});

	describe('nextPage', () => {
		let state;
		beforeEach(function() {
			const initialState = Map({pageSize: 3});
			const list = Map({
				items: List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
				totalListsAdded: 1
			});
			state = setup(initialState, list);
		});

		it('moves to the second page', () => {
			const nextState = nextPage(state);

			expect(nextState.get('displayItems')).to.equal(List.of(4, 5, 6));
			expect(nextState.get('pageSize')).to.equal(3);
			expect(nextState.get('currentPage')).to.equal(2);
			expect(nextState.get('lastPage')).to.equal(4);
			expect(nextState.get('previousAvailable')).to.be.true;
			expect(nextState.get('nextAvailable')).to.be.true;
		});

		it('moves to the third page', () => {
			const nextState = nextPage(nextPage(state));

			expect(nextState.get('displayItems')).to.equal(List.of(7, 8, 9));
			expect(nextState.get('pageSize')).to.equal(3);
			expect(nextState.get('currentPage')).to.equal(3);
			expect(nextState.get('lastPage')).to.equal(4);
			expect(nextState.get('previousAvailable')).to.be.true;
			expect(nextState.get('nextAvailable')).to.be.true;
		});

		it('moves to the last page', () => {
			let nextState = state;
			while (nextState.get('nextAvailable')) {
				nextState = nextPage(nextState);
			}

			expect(nextState.get('displayItems')).to.equal(List.of(10));
			expect(nextState.get('pageSize')).to.equal(3);
			expect(nextState.get('currentPage')).to.equal(4);
			expect(nextState.get('lastPage')).to.equal(4);
			expect(nextState.get('previousAvailable')).to.be.true;
			expect(nextState.get('nextAvailable')).to.be.false;
		});
	});

	describe('previousPage', () => {
		let state;
		before(function() {
			const initialState = Map({pageSize: 4});
			const list = Map({
				items: List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
				totalListsAdded: 1
			});
			state = setup(initialState, list);
		});

		it('is on the last page', () => {
			// Move to last page
			while (state.get('nextAvailable')) {
				state = nextPage(state);
			}

			expect(state.get('displayItems')).to.equal(List.of(9, 10));
			expect(state.get('pageSize')).to.equal(4);
			expect(state.get('currentPage')).to.equal(3);
			expect(state.get('lastPage')).to.equal(3);
			expect(state.get('previousAvailable')).to.be.true;
			expect(state.get('nextAvailable')).to.be.false;
		});

		it('moves to the second to last page', () => {
			state = previousPage(state);

			expect(state.get('displayItems')).to.equal(List.of(5, 6, 7, 8));
			expect(state.get('pageSize')).to.equal(4);
			expect(state.get('currentPage')).to.equal(2);
			expect(state.get('lastPage')).to.equal(3);
			expect(state.get('previousAvailable')).to.be.true;
			expect(state.get('nextAvailable')).to.be.true;
		});

		it('moves to the first page', () => {
			state = previousPage(state);

			expect(state.get('displayItems')).to.equal(List.of(1, 2, 3, 4));
			expect(state.get('pageSize')).to.equal(4);
			expect(state.get('currentPage')).to.equal(1);
			expect(state.get('lastPage')).to.equal(3);
			expect(state.get('previousAvailable')).to.be.false;
			expect(state.get('nextAvailable')).to.be.true;
		});
	});
});
