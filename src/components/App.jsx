import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import routes from '../routes';

import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import {syncReduxAndRouter, routeReducer} from 'redux-simple-router';
import {createHistory} from 'history';

import createStore from '../store';
import {setPage, setSelectedItem} from '../actionCreators';

const DevTools = createDevTools(
	<DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
		<LogMonitor theme="tomorrow"/>
	</DockMonitor>
);

export const store = createStore(DevTools.instrument, routeReducer);
const history = createHistory();

syncReduxAndRouter(history, store, state => state.get('routing'));  // router state not at state.routing

// Setup state on initial load i.e. if starting on a specific path /page/2?articleID=8
history.listen(location => {
	const pageNumber = location.pathname.match(/\/page\/(\d+)/);
	if (pageNumber && pageNumber[1]) {
		store.dispatch(setPage(Number(pageNumber[1])));
	}

	const articleID = location.search.match(/articleID=(\d*)/);
	if (articleID && articleID[1]) {
		store.dispatch(setSelectedItem(Number(articleID[1])));
	}
})();	// deregister listen event

export default () => (
	<Provider store={store}>
		<div>
			<Router history={history}>{routes}</Router>
			<DevTools/>
		</div>
	</Provider>
);