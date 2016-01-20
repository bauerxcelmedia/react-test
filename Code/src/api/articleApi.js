"use strict";

//This file is mocking a web API by hitting hard coded data.
let _ = require('lodash');
//return cloned copy so that the item is passed by value instead of by reference
let _clone = function (item) {
	return JSON.parse(JSON.stringify(item)); 
};

let ArticleApi = {
    //return articles and button status or empty array if file can not read
    getArticlesPage: function (page) {
        try
        {
            let articlesJson = require('./articleDataPage' + page).articles;
            return { articles: _clone(articlesJson), disableBtn: false };
        }
        catch(err)
        {
            return { articles: [], disableBtn: true };
        }
    }
};

module.exports = ArticleApi;