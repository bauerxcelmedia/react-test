# React Test

- users can see screen displaying a list of article tiles. each tile displayed title and small image.
- users can press a button to load more article tiles at the bottom of the list.
- users can touch an article tile to go to a details screen of the article. the details screen shows the title, large image and article paragraph content.
- users can swipe left or right on the article detail screen to load the previous or next article in the list.
- users can press a back button on the article detail screen to go back to the listing screen.

## Wireframe



## Instructions

- Fork or copy this repository. Create a feature branch to do your work. When done email us a link to your branch.
- There is no design, feel free to make the list as aesthetically pleasing as you can as long as the main requirements are met.
- If there are any questions, feel free to record any assumptions made.

## Details

- use React for rendering the HTML list and button ui
- use the Flux data flow pattern (you may use Redux or any other Flux library)
- code must be unit tested, adhere to sound software engineering principles and be self documenting code
- code must be written using ES2016/ES2017, enable any options you like in Babel
- all articles have unique ids, titles and images. one article tile/teaser is:
```js
{
    id: 1,
    title: "article title 1",
    image: "http://placehold.it/300x250&text=image 1",
}
```
