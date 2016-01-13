import React from 'react';
import {Route} from 'react-router';
import Home from '../src/components/Home';
import Page from '../src/components/Page';
import ListItemsContainer from '../src/components/List/ListItemsContainer';

const NotFound = () => (
	<div>
		<h1>Page Not Found</h1>
		<ul>
			<li><a href="/">Return Home</a></li>
			<li><a href="/page/1">Start Page</a></li>
		</ul>
	</div>
);

export default (
	<div>
		<Route path="/" component={Home} />
		<Route path="page" component={Page}>
			<Route path=":number" component={ListItemsContainer} />
		</Route>
		<Route path="*" component={NotFound}/>
	</div>
);
