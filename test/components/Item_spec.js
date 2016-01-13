import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import Item from '../../src/components/Item';
import {Card, CardHeader, CardText} from 'material-ui';
import {validateRenderedOutput, IGNORE_VALUE} from '../validate_helper';

function setup(selected) {
	const props = {
		title: 'article title 1',
		image: 'http://placehold.it/300x250&text=image 1',
		selected,
		onClick: sinon.spy()
	};

	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<Item {...props} />);
	const renderedOutput = shallowRenderer.getRenderOutput();

	return {props, shallowRenderer, renderedOutput};
}

describe('components', () => {
	describe('Item', () => {
		it('renders correctly when selected', () => {
			//<Card className="item-rows" onClick={onClick}>
			//	<CardHeader title='article title 1' avatar='http://placehold.it/300x250&text=image 1'/>
			//	<CardText>
			//    <img src='http://placehold.it/300x250&text=image 1' alt='image 1' width='300' height='250'/>
			//	</CardText>
			//</Card>

			const {renderedOutput} = setup(true);
			validateRenderedOutput(renderedOutput, Card, {
				className: 'item-rows',
				onClick: IGNORE_VALUE,
				children: IGNORE_VALUE
			});

			const [cardHeader, cardText, anything] = renderedOutput.props.children;
			validateRenderedOutput(cardHeader, CardHeader, {
				title: 'article title 1',
				avatar: 'http://placehold.it/300x250&text=image 1',
				titleColor: IGNORE_VALUE,
				subtitleColor: IGNORE_VALUE
			});
			validateRenderedOutput(cardText, CardText, {children: IGNORE_VALUE});
			expect(anything).to.be.undefined;

			validateRenderedOutput(cardText.props.children, 'img', {
				src: 'http://placehold.it/300x250&text=image 1',
				alt: 'image 1',
				width: '300',
				height: '250'
			});
		});

		it('renders correctly when not selected', () => {
			//<Card className="item-rows" onClick={onClick}>
			//	<CardHeader title='article title 1' avatar='http://placehold.it/300x250&text=image 1'/>
			//</Card>

			const {renderedOutput} = setup(false);
			validateRenderedOutput(renderedOutput, Card, {
				className: 'item-rows',
				onClick: IGNORE_VALUE,
				children: IGNORE_VALUE
			});

			const [cardHeader, cardText, anything] = renderedOutput.props.children;
			validateRenderedOutput(cardHeader, CardHeader, {
				title: 'article title 1',
				avatar: 'http://placehold.it/300x250&text=image 1',
				titleColor: IGNORE_VALUE,
				subtitleColor: IGNORE_VALUE
			});
			expect(cardText).to.be.false;		// {selected && <CardText> ...
			expect(anything).to.be.undefined;
		});

		it('onClick called when clicked', () => {
			const {props, renderedOutput} = setup(true);
			expect(props.onClick).not.called;
			renderedOutput.props.onClick();
			expect(props.onClick).calledOnce;
			props.onClick.reset();
		});
	});
});