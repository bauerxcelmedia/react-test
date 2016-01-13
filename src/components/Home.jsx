import React from 'react';

export default () => (
	<div>
		<h1>React Test</h1>
		<a href="https://bitbucket.org/bauermediaau/react-test">bitbucket.org/bauermediaau/react-test</a>
		<h2>Main requirements:</h2>
		<ul>
			<li>users can see a list of articles</li>
			<li>users can press a button to load more articles</li>
		</ul>
		<h3>Quick start links</h3>
		<ul>
			<li><a href="/page/1">Start</a></li>
			<li><a href="/page/2">Page 2</a></li>
			<li><a href="/page/3?articleID=12">Page 3 with a selected article</a></li>
		</ul>
		<h3>Explanations</h3>
		<ul>
			<li>A list of 12 articles are initially loaded, but only 5 are displayed per page, in a thumbnail view.</li>
			<li>Clicking on an article will set that item to be selected and display it's full size image.</li>
			<li>Navigating between the pages is accomplished by using the NEXT and PREVIOUS PAGE buttons, which will update
				the current page number and the url.</li>
			<li>Pressing 'Load More' will add another 8 articles increasing the maximum pages to 4 and disabling that button.</li>
		</ul>
		<h3>Technology</h3>
		<ul>
			<li>React v.0.14.3</li>
			<li>Redux v.3 - Flux implementation</li>
			<li>Redux DevTools</li>
			<li>Webpack</li>
			<li>React Router v.1</li>
			<li>Redux Simple Router</li>
			<li>ImmutableJS</li>
			<li>Mocha/Chai</li>
		</ul>
		<h3>Notable Accomplishments</h3>
		<ul>
			<li>Used the latest versions of React/Redux/React Router (as at the end of 2015).</li>
			<li>Current route kept in sync with the url and 'hackable'.</li>
			<li>Added Redux DevTools and integrated it with ImmutableJS (Ctrl+h to hide it).</li>
			<li>Thoroughly enjoyed learning the React ecosystem despite numerous
				struggles integrating the various components.</li>
		</ul>
		<h3>Todo</h3>
		<ul>
			<li>Make this page Isomorphic/Universal - horrible flicker on startup.</li>
			<li>Add end-to-end testing.</li>
			<li>Animate the selection/deselection of articles.</li>
			<li>Modify the build process to produce production builds.</li>
		</ul>
	</div>
);


