import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui';

const Item = ({title, image, selected, onClick}) => {
	// Get width. height and name of image from the image url
	const [, width, height, text] = image.match(/^.*\/(\d+)x(\d+)&text=(.*)$/);

	return (
		<Card className="item-rows" onClick={onClick}>
			<CardHeader title={title} avatar={image}/>
			{selected &&
			<CardText>
				<img src={image} alt={text} width={width} height={height}/>
			</CardText>
			}
		</Card>
	);
};

Item.propTypes = {
	title: React.PropTypes.string,
	image: React.PropTypes.string,
	selected: React.PropTypes.bool,
	onClick: React.PropTypes.func
};

export default Item;