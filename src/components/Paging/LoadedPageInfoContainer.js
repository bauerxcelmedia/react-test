import React from 'react';                  // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
import LoadedPageInfo from './LoadedPageInfo';

const mapStateToProps = (state) => {
	return {
		disableLoadMore: state.getIn(['data', 'list', 'totalListsAdded']) > 1
	};
};

export default connect(mapStateToProps)(LoadedPageInfo);
