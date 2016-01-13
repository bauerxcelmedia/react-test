import React from 'react';
import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import Page from '../../src/components/Page';
import PagingNavigationContainer from '../../src/components/Paging/PagingNavigationContainer';
import {AppBar} from 'material-ui';
import LoadedPageInfoContainer from '../../src/components/Paging/LoadedPageInfoContainer';

function setup() {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<Page />);
	const renderedOutput = shallowRenderer.getRenderOutput();

	return renderedOutput;
}

describe('components', () => {
	describe('Page', () => {
		it('renders Page correctly', () => {
			//<div>
			//	<PagingNavigationContainer/>
			//	<AppBar title="Items:" iconElementRight={
			//		<LoadedPageInfo/>
			//	}/>
			//</div>

			const renderedOutput = setup();
			expect(renderedOutput.type).to.equal('div');

			const [pagingNavigation, appBar, anything] = renderedOutput.props.children;
			expect(pagingNavigation.type).to.equal(PagingNavigationContainer);
			expect(appBar.type).to.equal(AppBar);
			expect(anything).to.be.undefined;

			const {title, iconElementRight} = appBar.props;
			expect(title).to.equal('Items:');
			expect(iconElementRight.type).to.equal(LoadedPageInfoContainer);
		});
	});
});