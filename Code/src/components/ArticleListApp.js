import React, {PropTypes} from 'react';

// Article List component
class ArticleListForm extends React.Component {
  constructor(props) {
    super(props);

    this.props.actions.initializeArticleList = this.props.actions.initializeArticleList.bind(this);
    this.props.actions.loadArticlesPage = this.props.actions.loadArticlesPage.bind(this);

    this.showMore = this.showMore.bind(this);

      // call INITIALIZE action
    this.props.actions.initializeArticleList(this.props.articlesLoadsAppState);
 }
    // function that shows next page, call SHOW_MORE action
    showMore() {
        this.props.articlesLoadsAppState.page ++;
        this.props.actions.loadArticlesPage(this.props.articlesLoadsAppState);
  }

  render() {
      let model = this.props.articlesLoadsAppState;

      return (

      <div className="list-box">
        <h2>Article List</h2>

    {  
        model.articles.map( function(article){

            return (
                <ul key={article.id} className="media-list">
                     <li>
                        <div className="media-left">
                             <img className="img-style" src={article.image} alt={article.title}/>
                        </div>
                        <div className="media-body">
                            <h4>{article.title}</h4>
                        </div>
                    </li>
                </ul>
        );
                        })
    }
        <button onClick={this.showMore} disabled={model.disabled}>Show more...</button>
      </div>
    );
        }
}

ArticleListForm.propTypes = {
    actions: PropTypes.object.isRequired,
    articlesLoadsAppState: PropTypes.object.isRequired
};

export default ArticleListForm;
