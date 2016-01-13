import React from 'react';

const PagingLocation = ({pageNumber, maxPages}) => (
	<div>
		Page {pageNumber} of {maxPages}
	</div>
);

PagingLocation.propTypes = {
	pageNumber: React.PropTypes.number,
	maxPages: React.PropTypes.number
};

export default PagingLocation;