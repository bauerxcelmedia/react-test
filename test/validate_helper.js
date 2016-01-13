import {expect} from 'chai';

export const IGNORE_VALUE = 'A value that a prop would not contain so that it is ignored';

// Helper function to iterate through the expectedProps to ensure that they exist
export function validateRenderedOutput(output, type, expectedProps) {
	expect(output.type).to.equal(type);
	expect(Object.keys(output.props)).to.eql(Object.keys(expectedProps));

	Object.keys(expectedProps).filter((key) => expectedProps[key] != IGNORE_VALUE)
		.map((key) => expect(output.props[key]).to.equal(expectedProps[key]));
}