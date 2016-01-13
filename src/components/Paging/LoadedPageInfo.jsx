import React from 'react';
import PagingLocationContainer from '../Paging/PagingLocationContainer';

// Page number and 'Load More' button at right of Items heading
const LoadedPageInfo = (props, {onLoadMoreClicked}) => (
	<div className="pageInfoIconElement">
		<PagingLocationContainer/>
		<button key="load_more" disabled={props.disableLoadMore} onClick={onLoadMoreClicked}>Load More</button>
	</div>
);

LoadedPageInfo.contextTypes = {
	onLoadMoreClicked: React.PropTypes.func
};

LoadedPageInfo.propTypes = {
	onLoadMoreClicked: React.PropTypes.func,
	disableLoadMore: React.PropTypes.bool
};

export default LoadedPageInfo;