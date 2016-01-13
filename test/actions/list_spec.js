import {List, Map} from 'immutable';
import {expect} from 'chai';
import {addList, INITIAL_STATE} from '../../src/actions/listActions';

describe('list actions', () => {
	describe('addList', () => {
		function runTests(message, tests) {
			describe(message, function () {
				tests.forEach(function (test) {
					it(test.message, () => {
						const nextState = addList(test.input, test.add);
						expect(nextState).to.equal(test.expected);
					});
				});
			});
		}

		const initialState = INITIAL_STATE;
		it('current state is set to the initial (empty) state', () => {
			expect(initialState).to.equal(Map({
				items: List(),
				totalListsAdded: 0
			}));
		});
		const initiallyEmptyTests = [
			{message: 'unchanged when null added to the initial (empty) state', input: initialState, add: null, expected: Map({items: List(), totalListsAdded: 0})},
			{message: 'unchanged when undefined added to the initial (empty) state', input: initialState, add: undefined, expected: Map({items: List(), totalListsAdded: 0})},
			{message: 'string added to the initial (empty) state', input: initialState, add: 'A', expected: Map({items: List.of('A'), totalListsAdded: 1})},
			{message: 'array added to the initial (empty) state', input: initialState, add: List.of('A', 'B'), expected: Map({items: List.of('A', 'B'), totalListsAdded: 1})}
		];

		const singleItemState = addList(initialState, 'A');
		it('current state is set to contain a single item', () => {
			expect(singleItemState).to.equal(Map({
				items: List.of('A'),
				totalListsAdded: 1
			}));
		});
		const singleDataTests = [
			{message: 'unchanged when null added to string', input: singleItemState, add: null, expected: Map({items: List.of('A'), totalListsAdded: 1})},
			{message: 'unchanged when undefined added to string', input: singleItemState, add: undefined, expected: Map({items: List.of('A'), totalListsAdded: 1})},
			{message: 'string added to string', input: singleItemState, add: 'B', expected: Map({items: List.of('A', 'B'), totalListsAdded: 2})},
			{message: 'array added to string', input: singleItemState, add: List.of('B', 'C'), expected: Map({items: List.of('A', 'B', 'C'), totalListsAdded: 2})}
		];

		const multipleItemState = addList(singleItemState, 'B');
		it('current state is set to contain multiple item', () => {
			expect(multipleItemState).to.equal(Map({
				items: List.of('A', 'B'),
				totalListsAdded: 2
			}));
		});
		const arrayTests = [
			{message: 'unchanged when null added to array', input: multipleItemState, add: null, expected: Map({items: List.of('A', 'B'), totalListsAdded: 2})},
			{message: 'unchanged when undefined added to array', input: multipleItemState, add: undefined, expected: Map({items: List.of('A', 'B'), totalListsAdded: 2})},
			{message: 'string added to array', input: multipleItemState, add: 'C', expected: Map({items: List.of('A', 'B', 'C'), totalListsAdded: 3})},
			{message: 'array added to array', input: multipleItemState, add: List.of('C', 'D'), expected: Map({items: List.of('A', 'B', 'C', 'D'), totalListsAdded: 3})}
		];

		runTests('list is initially empty', initiallyEmptyTests);
		runTests('list contains string data', singleDataTests);
		runTests('list contains array data', arrayTests);
	});
});