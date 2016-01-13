import React from 'react';
import {AppBar} from 'material-ui';
import PagingNavigationContainer from './Paging/PagingNavigationContainer';
import LoadedPageInfoContainer from './Paging/LoadedPageInfoContainer';

const Page = ({children}) => (
	<div>
		<PagingNavigationContainer/>
		<AppBar title="Items:" iconElementRight={
           <LoadedPageInfoContainer/>
        }/>
		{children}
	</div>
);

Page.propTypes = {
	children: React.PropTypes.object
};

export default Page;