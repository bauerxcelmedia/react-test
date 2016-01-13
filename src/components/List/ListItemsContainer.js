import React from 'react';                  // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
import {pushPath} from 'redux-simple-router';
import ListItems from './ListItems';

const mapStateToProps = (state) => {
	return {
		items: state.getIn(['data', 'paging', 'displayItems']),
		articleID: state.getIn(['data', 'articleID']),
		currentPage: state.getIn(['data', 'paging', 'currentPage'])
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onClick: (id, currentPage, articleID) => {
			const queryString = articleID == id ? '' : `?articleID=${id}`;
			dispatch(pushPath(`/page/${currentPage}${queryString}`, {articleID}));
		}
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, {
		items: stateProps.items,
		articleID: stateProps.articleID,
		onClick: (id) => dispatchProps.onClick(id, stateProps.currentPage, stateProps.articleID)
	});
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ListItems);