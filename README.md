# React Test #

https://github.com/bauerxcelmedia/react-test

## Main requirements: ##

* users can see a list of articles
* users can press a button to load more articles

### Implementation ###

* A list of 12 articles are initially loaded, but only 5 are displayed per page, in a thumbnail view.
* Clicking on an article will set that item to be selected and display it's full size image.
* Navigating between the pages is accomplished by using the NEXT and PREVIOUS PAGE buttons, which will update the current page number and the url.
* Pressing 'Load More' will add another 8 articles increasing the maximum pages to 4 and disabling that button.

### Technology ###

* React v.0.14.3
* Redux v.3 - Flux implementation
* Redux DevTools
* Webpack
* React Router v.1
* Redux Simple Router
* ImmutableJS
* Mocha/Chai

### Setup ###

* Install dependencies with npm install
* Run webpack-dev-server with npm start
* Navigate to http://localhost:8080