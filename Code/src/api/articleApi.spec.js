import chai from 'chai';
import articleApi from './articleApi';



describe('Api for getting articles', () => {
    describe('getArticlesPage', () => {
        let articlesRes = articleApi.getArticlesPage(1);
        let assert = require('chai').assert;

        assert.typeOf(articlesRes, 'object');
        assert.isNotNull(articlesRes);
        assert.lengthOf(articlesRes.articles, 3, 'articlesRes has a length of 3');
        assert.isFalse(articlesRes.disableBtn)
    });
});