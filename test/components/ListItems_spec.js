import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import {List} from 'immutable';
import ListItems from '../../src/components/List/ListItems';
import Item from '../../src/components/Item';
import {validateRenderedOutput, IGNORE_VALUE} from '../validate_helper';

function setup() {
	const props = {
		id: 1,
		items: List.of(
			{id: 1},
			{id: 2}
		),
		articleID: 1,
		onClick: sinon.spy()
	};

	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<ListItems {...props} />);
	const renderedOutput = shallowRenderer.getRenderOutput();

	return {props, shallowRenderer, renderedOutput};
}

describe('components', () => {
	describe('ListItems', () => {
		it('renders correctly', () => {
			//<div>
			//	<Item key=1 selected=true {...item} onClick={onClick(1)}/>
			//	<Item key=2 selected=false {...item} onClick={onClick(2)}/>
			//</div>

			const {renderedOutput} = setup();
			expect(renderedOutput.type).to.equal('div');

			const items = renderedOutput.props.children;
			expect(items.size).to.equal(2);
			validateRenderedOutput(items.get(0), Item, {
				selected: true,
				id: 1,
				onClick: IGNORE_VALUE
			});
			validateRenderedOutput(items.get(1), Item, {
				selected: false,
				id: 2,
				onClick: IGNORE_VALUE
			});
		});

		it('onClick called when clicked', () => {
			const {props, renderedOutput} = setup();
			expect(props.onClick).not.called;
			renderedOutput.props.children.get(0).props.onClick();
			expect(props.onClick).calledOnce;
			props.onClick.reset();
		});
	});
});