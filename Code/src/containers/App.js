// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ArticleListApp from '../components/ArticleListApp';
import * as ArticleListActions from '../actions/articleListActions';

class App extends React.Component {
  render() {
      const { articlesLoadsAppState, actions } = this.props;

    return (
        <ArticleListApp articlesLoadsAppState={articlesLoadsAppState} actions={actions} />
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  articlesLoadsAppState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
      articlesLoadsAppState: state.articlesLoadsAppState
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(ArticleListActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
