import {Map} from 'immutable';
import {INITIAL_STATE as pagingInitialState} from './pagingActions';
import {INITIAL_STATE as listInitialState} from './listActions';
import {INITIAL_STATE as itemInitialState} from './itemActions';

export const INITIAL_STATE = Map({
	articleID: itemInitialState,
	paging: pagingInitialState,
	list: listInitialState
});