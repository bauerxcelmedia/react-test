import React from 'react';
import Item from '../Item';
import Immutable from 'immutable';

const ListItems = ({items, articleID, onClick}) => (
	<div>
		{items && items.map((item) => {
			return (
				<Item key={item.id} selected={item.id == articleID} {...item} onClick={() => onClick(item.id)}/>
			);
		})}
	</div>
);

ListItems.propTypes = {
	items: React.PropTypes.instanceOf(Immutable.List),
	articleID: React.PropTypes.number,
	onClick: React.PropTypes.func
};

export default ListItems;