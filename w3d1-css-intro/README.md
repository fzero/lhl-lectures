# CSS (re)Intro

## Semantic HTML
HTML has a lot of different tags that exist to describe their contents; semantic HTML is using the most appropriate tag for the content. For example, `<div>` doesn't mean anything, but `<section>` does.

[Wikipedia](https://en.wikipedia.org/wiki/Semantic_HTML) has a good article on semantic HTML. You can find a pretty good HTML element reference [here](http://html5doctor.com/element-index/).

## Block level elements vs inline elements and their nesting
In short, inline elements are considered part of a line of text and will flow with it, while block-level elements occupy their own space and make text flow around it in several predefined ways (called **floating**). You can use CSS to *change the usual behaviour of any objects* from inline to block-level and vice-versa.

There's also the concept of `inline-block` which might sound confusing at first, but does exactly what it says: allow a block-level element to flow like a line of text, obeying properties like `text-align` defined on the enclosing element.

## CSS Reset / normalize
Every browser comes built-in with a default (and slightly different) CSS stylesheet, so it's necessary to use a CSS-reset file to start with a blank slate. There are many available (I'm partial to h5bp):

* https://github.com/necolas/normalize.css/blob/master/normalize.css
* http://meyerweb.com/eric/tools/css/reset/
* https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css

## Box sizing
Every block-level element can have width, height, margins, borders and padding.

* Margins are _outside_ of the element
* Borders are _inside_ of the element (not always, see below)
* Padding is _inside_ of the element (internal margin between border and content)

These values interact to give you the final size of the element. Sadly each browser can do this slightly different, so we need to fix that. Enter...

### Box sizing: border-box (non-default)
This is a messy one. It really _should_ be the default, but luckily [it's a fixable problem](https://www.paulirish.com/2012/box-sizing-border-box-ftw).

## BONUS: circles and triangles
Yes, you can make them just with CSS!

References:
* [CSS circles](https://davidwalsh.name/css-circles)
* [CSS triangles](https://davidwalsh.name/css-triangles)

## Code discussed in class

You can find it in the [`/code`](code) folder as usual. The HTML part is pretty standard, but make sure to check out [`main.css`](code/css/main.css) - I've added plenty of contents explaining what's going on.

You can also find variations created on previous classes in the [`/previous_examples`](previous_examples) folder. They all started off the same HTML we've discussed in class, but different live-coding sessions have different results.
