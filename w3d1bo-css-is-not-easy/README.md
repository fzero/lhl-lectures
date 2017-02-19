# CSS is Not Easy

_Original lecture notes by [Adrian Li](https://github.com/adrianmcli/lhl-lectures/tree/master/w3d1b-css-is-not-easy) - Thanks!_

The code discussed in class can be found in the [`/code`](code) folder of this repo.

## Topics covered (Summary)

- CSS Specificity
  - Rule Ordering
  - Specificity Hierarchy
  - Calculating Specificity

- CSS Combinators
  - Descendant Selector (space)
  - Direct Child Selector (>)
  - Adjacent Sibling Selector (+)
  - General Sibling Selector (~)

- CSS Gotchas
  - The `display` property
  - The `position` property
  - CSS Centering

- CSS Best Practices
  - 8 simple rules for a robust, scalable CSS architecture
  - IDs vs Classes
  - Class Naming
  - Naming Frameworks
  - Flexbox

## CSS Specificity

Principles for sorting out conflicting CSS rules.

### Rule Ordering

If there are two rules with identical selectors, the later one will override the earlier one:

```css
/* This rule will not be visible */
p { background: red }

/* This rule will override the previous one */
p { background: green }
```

### Specificity Hierarchy

In order of most specific to least specific:

1. Inline styles
2. ID selectors
3. Class selectors, attributes selectors, and pseudo-classes
4. Element selectors and pseudo-element selectors

One way to calculate this is to assign "points" to each of these selectors. The selector with the highest number of points will end up being applied.

#### Inline Styles (worth 1,000 points)

Writing the actual style into the HTML element:

```html
<h1 style="color: red">
```

This essentially overrides all the CSS rules declared elsewhere.

There is an exception to this with the `!important` rule (which is basically a trump card you can use in your CSS rule), but it is very dangerous and should only be used temporarily for testing.

#### ID Selectors (worth 100 points)

IDs should be used for things where you are certain there will only be one of. In other words, it's for elements that you are certain to be unique.

HTML:

```html
<div id="header">My Header</div>
```

CSS:

```css
#header { color: red }
```

This is the most specific selector we have, and thus it has a very high specificity.

#### Class, Attributes, and Pseudo-class Selectors (worth 10 points)

```css
.class-name { color: red }

[type="text"] { color: red }

p:hover { color: red }
```

Each of the these selectors are worth 10 points each, and you'll likely be using classes very often.


#### Element selectors and pseudo-element selectors (worth 1 point)

```css
p { color: red }

p:after { color: red }
```

Directly selecting the HTML tag (such as `div`, `body`, `p`, etc.) is often used, but it only has a specificity of one point.

Pseudo-elements are a confusing feature of CSS and is outside of the scope of this discussion.

### Calculating Specificity

Here are some examples:

```css
/* 100 */
#test { background: red }

/* 10 + 1 = 11 */
.item p { background: orange }

/* 1 */
p { background: green }

/* 1 + 100 + 1 = 102 */
body #wrap p { background: yellow }
```

Note that combinators such as `>`, `~` ,`+`, and `[space]` have no effect on specificity.

If you still end up getting confused, use the specificity calculator: https://specificity.keegan.st/

## CSS Combinators

### Descendant Selector (space)

```css
.wrap p { color: blue; }
```

This is saying that any `<p>` tags underneath an element with a class of `wrap` should be coloured blue. Note that it doesn't matter how deeply nested the `<p>` tag is. In the following HTML, all of the `<p>` tags would get colored blue.

```html
<div class="wrap">
  <p>I'm blue!</p>
  <div>
    <p>Me too!</p>
  </div>
</div>
```

### Direct Child Selector (>)

```css
.wrap > p { color: red; }
```

This is saying that any `<p>` tags **directly** under an element with a class of `wrap` should be coloured red. In the following HTML, only the first `<p>` tag will be colored red.

```html
<div class="wrap">
  <p>I'm red!</p>
  <div>
    <p>Not me!</p>
  </div>
</div>
```

### Adjacent Sibling Selector (+)

```css
.item + p { color: yellow; }
```

This is saying that any `<p>` tag immediately after (and on the same level of nesting as) an element with a class of `item` should be coloured yellow. Note that the word "sibling" in this context means elements that are after the first element we are selecting. In the following example, you'll notice that the first `<p>` tag is not yellow even though it is on the same level of nesting as the `<span class="item">` tag.

```html
<p>Not yellow!</p>

<span class="item">
   <p>Not yellow!</p>
</span>

<p>I'm yellow!</p>
```

### General Sibling Selector (~)

```css
.item ~ p { color: pink; }
```

This is saying that any `<p>` tag after (and on the same level of nesting as) an element with a class of `item` should be colored pink. In the following example, all but the first `<p>` tag will be colored pink.

```html
<p>Not pink!</p>

<span class="item"></span>

<p>I'm pink!</p>
<p>I'm pink!</p>
<p>I'm pink!</p>
```

## CSS Gotchas

### The `display` Property

#### `display: block`

Block elements are elements that will start on a new line and expand as wide as it can. `<div>` tags are, by default, block elements as are all the header tags (`<h1>`, `<h2>`, `<h3>`, etc.) and paragraph (`<p>`) tags.

#### `display: inline`

Inline elements are elements that will sit happily without creating a new line or disrupting the flow of elements around it. Think of a `<span>` tag inside a paragraph, you can use it to surround a word inside a paragraph without affecting the flow of the paragraph itself. These elements cannot take a width, they conform to their surroundings.

Some examples of this are `<a>`, `<em>` and `<strong>` tags. These tags are often used to decorate text inside of a paragraph.

#### `display: none`

This hides the element completely, as if it wasn't there to begin with.

#### Other Values

Beyond these basic values, there are also more exotic ones such as `inline-block` and `flex`. These values are a bit more complex and are outside the scope of this discussion.

### The `position` Property

Refer to the LearnLayout tutorial: http://learnlayout.com/position.html

### Centering in CSS

Centering things in CSS can be very very very tricky. As a general rule, horizontal centering tends to be a lot easier to deal with than vertical centering. Of course, it also depends on what you are trying to center and how you want it to display depending on its container size.

Many times, for horizontal centering, it's as easy as setting `text-align: center` or `margin: auto`. In other times, it may require you to use flex box techniques or some form of `position: absolute` and `transform: translate(-50%,-50%)`. The discussion for this is rather lengthy, so I'll leave the details to other articles.

Use may article as a reference: https://www.w3.org/Style/Examples/007/center.en.html

## CSS Best Practices

Article: [8 simple rules for a robust, scalable CSS architecture](https://github.com/jareware/css-architecture)

### IDs vs Classes

IDs are for unique elements (i.e. there should only ever be one of this), try not to use this everywhere.

Classes are for things that can conceivably be repeated (i.e. everything else). Naturally, you'd expect classes to be used very frequently.

### Class Naming

The most common convention is to use `kabab-case` rather than `camelCase` or `snake_case`. That being said, the most important thing is to be consistent. Choose a particular style and stick with it, or else your CSS can get very messy and difficult to maintain.

### Naming Frameworks

Having too many nested rules is a very bad thing, it will make your CSS very unwieldy and difficult to modify. Using a pre-processor such as SASS/SCSS/LESS/Stylus can remove this problem but that is outside of our discussion.

Another way to get around this complexity is to have a naming scheme. The most popular one out there is [BEM](http://getbem.com/naming/). There is also [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/) but it is a little less popular and more a set of principles than a complete framework.

### Flexbox

Flexbox takes away a lot of the pain of CSS centering and positioning that can be super tricky. It allows for more advanced layouts without having to warp your mind too much. That being said, it is relatively new compared to more traditional layout techniques, so you will have to put some time into understanding it.

If you plan on becoming a frontend developer in the future, knowledge of flexbox is a must.

Flexbox is already [widely supported](http://caniuse.com/#feat=flexbox). It would be a good idea to start learning it. One of the best ways to learn is through a game! Check out two that I've linked below:

- [Flexbox Froggy](http://flexboxfroggy.com/)
- [Flexbox Defense](http://www.flexboxdefense.com/)
