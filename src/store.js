import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import reducer from './reducer';
import {Map} from 'immutable';

export default (storeEnhancer, routeReducer) => {
	const reducers = combineImmutableReducers(reducer, routeReducer);

	const store = compose(
		applyMiddleware(logger),
		storeEnhancer()                 // For Redux Dev Tools
	)(createStore);

	return store(reducers);
};

const combineImmutableReducers = (reducer, routeReducer) => {
	const reducers = combineReducers({
		data: reducer,
		routing: routeReducer
	});

	return (state = {}, action) => Map(reducers(
		Map.isMap(state) ? state.toObject() : state, action));
};

function logger(/*{getState}*/) {
	return (next) => (action) => {
//		console.log('will dispatch', action);

		// Call the next dispatch method in the middleware chain.
		const nextAction = next(action);

//		console.log('state after dispatch', getState());

		return nextAction;
	};
}
