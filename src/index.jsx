import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {addList} from './actionCreators';
import App, {store} from './components/App';

require('./css/main.css');

store.dispatch(addList(require('../data/items.json')));
const loadMore = () => {
	store.dispatch(addList(require('../data/more_items.json')));
};

class AppProvider extends Component {
	getChildContext() {
		return {
			onLoadMoreClicked: this.props.onLoadMoreClicked
		};
	}

	render() {
		return this.props.children;
	}
}

AppProvider.childContextTypes = {
	onLoadMoreClicked: React.PropTypes.func
};

AppProvider.propTypes = {
	children: React.PropTypes.object,
	onLoadMoreClicked: React.PropTypes.func
};

ReactDOM.render(
	<AppProvider onLoadMoreClicked={loadMore}>
		<App/>
	</AppProvider>,
	document.getElementById('app')
);