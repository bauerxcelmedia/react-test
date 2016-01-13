import React from 'react';
import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import PagingLocation from '../../src/components/Paging/PagingLocation';

function setup() {
	const props = {
		pageNumber: 2,
		maxPages: 5
	};

	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<PagingLocation {...props} />);
	return shallowRenderer.getRenderOutput();
}

describe('components', () => {
	describe('PagingLocation', () => {
		it('renders correctly', () => {
			//<div>
			//	Page 2 of 5
			//</div>

			const renderedOutput = setup();
			expect(renderedOutput.type).to.equal('div');
			expect(renderedOutput.props.children.join('')).to.equal('Page 2 of 5');
		});
	});
});