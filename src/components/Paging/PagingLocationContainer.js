import React from 'react';                  // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
import PagingLocation from './PagingLocation';

const mapStateToProps = (state) => {
	return {
		pageNumber: state.getIn(['data', 'paging', 'currentPage']),
		maxPages: state.getIn(['data', 'paging', 'lastPage'])
	};
};

export default connect(mapStateToProps)(PagingLocation);
