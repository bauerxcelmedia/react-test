import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import PagingNavigation from '../../src/components/Paging/PagingNavigation';
import RaisedButton from 'material-ui/lib/raised-button';
import {validateRenderedOutput, IGNORE_VALUE} from '../validate_helper';

function setup(previousDisabled, nextDisabled) {
	const props = {
		previousAvailable: !previousDisabled,
		nextAvailable: !nextDisabled,
		onPreviousClick: sinon.spy(),
		onNextClick: sinon.spy()
	};

	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<PagingNavigation {...props} />);
	const renderedOutput = shallowRenderer.getRenderOutput();

	return {props, shallowRenderer, renderedOutput};
}

describe('components', () => {
	describe('PagingNavigation', () => {
		it('renders correctly with both buttons disabled', () => {
			//<div>
			//	<RaisedButton label="Previous Page" disabled=true onClick={onPreviousClick}/>
			//	{' '}
			//	<RaisedButton label="Next Page" disabled=true onClick={onNextClick}/>
			//</div>

			const {renderedOutput} = setup(true, true);
			expect(renderedOutput.type).to.equal('div');

			const [previousButton, space, nextButton, anything] = renderedOutput.props.children;
			validateRenderedOutput(previousButton, RaisedButton, {
				label: 'Previous Page',
				disabled: true,
				onClick: IGNORE_VALUE,
				labelPosition: 'before'
			});
			expect(space).to.equal(' ');
			validateRenderedOutput(nextButton, RaisedButton, {
				label: 'Next Page',
				disabled: true,
				onClick: IGNORE_VALUE,
				labelPosition: 'before'
			});
			expect(anything).to.be.undefined;
		});

		it('renders correctly with both buttons enabled', () => {
			//<div>
			//	<RaisedButton label="Previous Page" disabled=false onClick={onPreviousClick}/>
			//	{' '}
			//	<RaisedButton label="Next Page" disabled=false onClick={onNextClick}/>
			//</div>

			const {renderedOutput} = setup(false, false);
			expect(renderedOutput.type).to.equal('div');

			const [previousButton, space, nextButton, anything] = renderedOutput.props.children;
			validateRenderedOutput(previousButton, RaisedButton, {
				label: 'Previous Page',
				disabled: false,
				onClick: IGNORE_VALUE,
				labelPosition: 'before'
			});
			expect(space).to.equal(' ');
			validateRenderedOutput(nextButton, RaisedButton, {
				label: 'Next Page',
				disabled: false,
				onClick: IGNORE_VALUE,
				labelPosition: 'before'
			});
			expect(anything).to.be.undefined;
		});

		it('renders correctly with previous disabled and next enabled', () => {
			//<div>
			//	<RaisedButton label="Previous Page" disabled=true onClick={onPreviousClick}/>
			//	{' '}
			//	<RaisedButton label="Next Page" disabled=false onClick={onNextClick}/>
			//</div>

			const {renderedOutput} = setup(true, false);
			expect(renderedOutput.type).to.equal('div');

			const [previousButton, space, nextButton, anything] = renderedOutput.props.children;
			validateRenderedOutput(previousButton, RaisedButton, {
				label: 'Previous Page',
				disabled: true,
				onClick: IGNORE_VALUE,
				labelPosition: 'before'
			});
			expect(space).to.equal(' ');
			validateRenderedOutput(nextButton, RaisedButton, {
				label: 'Next Page',
				disabled: false,
				onClick: IGNORE_VALUE,
				labelPosition: 'before'
			});
			expect(anything).to.be.undefined;
		});

		it('renders correctly with previous enabled and next disabled', () => {
			//<div>
			//	<RaisedButton label="Previous Page" disabled=false onClick={onPreviousClick}/>
			//	{' '}
			//	<RaisedButton label="Next Page" disabled=true onClick={onNextClick}/>
			//</div>

			const {renderedOutput} = setup(false, true);
			expect(renderedOutput.type).to.equal('div');

			const [previousButton, space, nextButton, anything] = renderedOutput.props.children;
			validateRenderedOutput(previousButton, RaisedButton, {
				label: 'Previous Page',
				disabled: false,
				onClick: IGNORE_VALUE,
				labelPosition: 'before'
			});
			expect(space).to.equal(' ');
			validateRenderedOutput(nextButton, RaisedButton, {
				label: 'Next Page',
				disabled: true,
				onClick: IGNORE_VALUE,
				labelPosition: 'before'
			});
			expect(anything).to.be.undefined;
		});

		it('onPreviousClick called when Previous Page clicked', () => {
			const {props, renderedOutput} = setup(false, false);
			expect(props.onPreviousClick).not.called;
			const [previousButton] = renderedOutput.props.children;
			previousButton.props.onClick();
			expect(props.onPreviousClick).calledOnce;
			props.onPreviousClick.reset();
		});

		it('onNextClick called when Next Page clicked', () => {
			const {props, renderedOutput} = setup(false, false);
			expect(props.onNextClick).not.called;
			const [, , nextButton] = renderedOutput.props.children;	// 3rd item
			nextButton.props.onClick();
			expect(props.onNextClick).calledOnce;
			props.onNextClick.reset();
		});
	});
});