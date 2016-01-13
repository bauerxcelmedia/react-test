import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

const PagingNavigation = ({previousAvailable, nextAvailable, onPreviousClick, onNextClick}) => {
	return (
		<div>
			<RaisedButton label="Previous Page" disabled={!previousAvailable} onClick={onPreviousClick}/>
			{' '}
			<RaisedButton label="Next Page" disabled={!nextAvailable} onClick={onNextClick}/>
		</div>
	);
};

PagingNavigation.propTypes = {
	previousAvailable: React.PropTypes.bool,
	nextAvailable: React.PropTypes.bool,
	onPreviousClick: React.PropTypes.func,
	onNextClick: React.PropTypes.func
};

export default PagingNavigation;