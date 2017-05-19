# SASS and responsive design

CSS is great(-ish), but it lacks some features common in _real_ programming languages, such as variables, modules and so on. There are a few tools that fill in that gap, and the most popular right now is [SASS](http://sass-lang.com).

## Getting sassy

SASS has two syntaxes: an oldschool one that uses significant whitespaces (like Python) and SCSS, which looks pretty much like CSS with additional features - the most notable being nesting, variables and partials.

This means instead of writing something like this:
```css
nav {
  border: 1px solid black;
}

nav ul {
  list-style: none;
  padding: 0;
  text-align: center;
}

nav a {
  text-decoration: none;
  font-weight: bold;
  color: #2184a5;
}
```

You can write this:
```scss
$link-color: #2184a5;

nav {
  border: 1px solid black;
  ul {
    list-style: none;
    padding: 0;
    text-align: center;
  }
  a {
    text-decoration: none;
    font-weight: bold;
    color: $link-color;
  }
}
```

The full SASS guide can be found [here](http://sass-lang.com/guide).

### Installation and usage

SASS was originally written in Ruby, so the official way to install it is by using the `gem` command. Luckily for us, it was also made into a library that can be used from Node with the [`node-sass` package](https://github.com/sass/node-sass). This gives you a command-line tool to compile SCSS into plain old CSS. You can then add it to your `package.json` like so:

```json
"scripts": {
  "compile-sass": "./node_modules/node-sass/bin/node-sass --watch --recursive --output public/css stylesheets",
 }
```

This will watch `.sass` and `.scss` files in the `./stylesheets` folder and put the resulting `.css` into `./public/css`. If you just want to run it once instead of making it watch for changes, remove the `--watch` argument.

It's also possible to integrate SASS directly with Express using the [`node-sass-middleware` package](https://github.com/sass/node-sass-middleware). You can add it to your Express app like this:

```js
const sassMiddleware = require('node-sass-middleware')

app.use(sassMiddleware({
  src: './stylesheets', // Location of SASS files
  dest: './public/css', // Compiled CSS location
  prefix:  '/css'       // URL path to be intercepted by the middleware and
}))                     // compiled on the fly. When the browser tries to
                        // GET /css/main.css, it compiles ./stylesheets/main.scss
```

In either case, remember two things:

* **All CSS files inside `/public/css` will be overwritten** every time the server starts. You should edit the `.scss` files inside `/stylesheets` instead.
* On the other hand, the browser has no idea how to parse SCSS, so you should link the **generated `.css` files generated in `/public/css` on your HTML**.

See the [`/code`](code) folder for more details.

## Responsive design

Whether we call it Responsive Design, Adaptive Design, Progressive Design, or Mobile-first Design, they all have one thing in common: it's all about making a website work well across different types of screens/devices.

The techniques used to deal with this are old, coming from an era where people wanted to print webpages, and a different style-sheet would be needed to support the printer. These days, `@media` queries can be used to read the size of the display area and override CSS rules accordingly. [MDN has a great guide on media queries (as usual)](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries).

The links below contain good tutorials on responsive design concepts, but if you have to remember one thing is this: always start designing your web applications assuming the user needs to do ONE thing and that thing is the only widget that matters in your page. Everything else should be secondary.

* [Responsive design basics (Google Dev Pages)](https://developers.google.com/web/fundamentals/design-and-ui/responsive/)
* [Common patterns for flexible layouts (Google Dev Pages)](https://developers.google.com/web/fundamentals/design-and-ui/responsive/patterns)
* [Using FlexBox for complex designs (CSS Tricks)](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### Grid systems

Responsive designs are usually created using grid systems, which place all  elements into columns and rows that can be stacked depending on the size of the display. [Bootstrap](http://getbootstrap.com/), [Materialize](http://materializecss.com/) and other frameworks come with a grid system built-in, but you can also use generators like [this one](http://www.responsivegridsystem.com) to create only the bare mininum code. This keeps things lean and unopinionated for you to show off your amazing design chops.

[Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) can also be used to create grids, but it's still not supported by all browsers. It gives you much more control over element distribution and positioning in when a collection of elements is involved.
