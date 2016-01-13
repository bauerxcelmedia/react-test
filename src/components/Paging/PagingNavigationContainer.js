import React from 'react';                  // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
import {pushPath} from 'redux-simple-router';
import PagingNavigation from './PagingNavigation';

const mapStateToProps = (state) => {
	return {
		previousAvailable: state.getIn(['data', 'paging', 'previousAvailable']),
		nextAvailable: state.getIn(['data', 'paging', 'nextAvailable']),
		currentPage: state.getIn(['data', 'paging', 'currentPage']),
		articleID: state.getIn(['data', 'articleID'])
	};
};

function newRoute(newPage, articleID) {
	const queryString = articleID != null ? `?articleID=${articleID}` : '';
	return pushPath(`/page/${newPage}${queryString}`);
}

const mapDispatchToProps = (dispatch) => {
	return {
		onPreviousClick: (currentPage, articleID) => {
			dispatch(newRoute(currentPage - 1, articleID));
		},
		onNextClick: (currentPage, articleID) => {
			dispatch(newRoute(currentPage + 1, articleID));
		}
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, {
		previousAvailable: stateProps.previousAvailable,
		nextAvailable: stateProps.nextAvailable,
		onPreviousClick: () => dispatchProps.onPreviousClick(stateProps.currentPage, stateProps.articleID),
		onNextClick: () => dispatchProps.onNextClick(stateProps.currentPage, stateProps.articleID)
	});
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PagingNavigation);