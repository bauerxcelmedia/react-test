import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import PagingLocationContainer from '../../src/components/Paging/PagingLocationContainer';
import LoadedPageInfo from '../../src/components/Paging/LoadedPageInfo';
import {validateRenderedOutput, IGNORE_VALUE} from '../validate_helper';

function setup() {
	const props = {
		onLoadMoreClicked: sinon.spy()
	};

	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<LoadedPageInfo {...props} />);
	const renderedOutput = shallowRenderer.getRenderOutput();

	return {props, shallowRenderer, renderedOutput};
}

describe('components', () => {
	describe('LoadedPageInfo', () => {
		it('renders iconElement correctly', () => {
			//<div className="pageInfoIconElement">
			//	<PagingLocationContainer/>
			//	<button onClick={onLoadMoreClicked}>Load More</button>
			//</div>

			const {renderedOutput} = setup();
			validateRenderedOutput(renderedOutput, 'div', {
				className: 'pageInfoIconElement',
				children: IGNORE_VALUE
			});

			const [pagingLocation, button, anything] = renderedOutput.props.children;
			expect(pagingLocation.type).to.equal(PagingLocationContainer);
			expect(button.type).to.equal('button');
			validateRenderedOutput(button, 'button', {
				disabled: IGNORE_VALUE,
				onClick: IGNORE_VALUE,
				children: 'Load More'
			});
			expect(anything).to.be.undefined;
		});
	});
});