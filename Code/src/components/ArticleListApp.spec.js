import chai from 'chai';
import cheerio from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react/lib/ReactDOMServer';
import ArticleListForm from './ArticleListApp';
import * as ArticleListActions from '../actions/articleListActions';

chai.should();
let assert = require('chai').assert;

describe('ArticleListApp Component', () => {
    describe('Load Articles', () => {
        it('displays as loading articles', () => {
            //arrange
            let props = {
                articlesLoadsAppState: {
                    page: 1,
                    disabled: false,
                    articles: [{id:1, title:'Test 1', image:'http://placehold.it/300x250&text=test1' }, 
                        {id:2, title:'Test 2', image:'http://placehold.it/300x250&text=test2' }],
                },
                actions: { 
                    initializeArticleList: ArticleListActions.initializeArticleList,
                    loadArticlesPage: ArticleListActions.loadArticlesPage
                }
                };



            let sut = React.createElement(ArticleListForm, props);
            let articles = props.articlesLoadsAppState.articles;
            //act
            let html = ReactDOMServer.renderToStaticMarkup(sut);
            let $ = cheerio.load(html);
            let articleTitleFirst = $('h4').first().html();
            let articleTitleSecond = $('h4').last().html();

            //assert
            assert.equal(articleTitleFirst, articles[0].title, 'Cannot find article');
            assert.equal(articleTitleSecond, articles[1].title, 'Cannot find article');
        });

    });

});
