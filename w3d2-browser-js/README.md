# Client-side Javascript (a.k.a. Return of the Browser)

Code discussed in class can be found inside [`/code`](code).

* Welcome to client-side JS!
    - We'll briefly dial it back to ES5...
    - ...but we can use most of ES6 (unless you like IE or Safari)
    - We'll talk about Javascript, and ONLY Javascript (no jQuery right now)
    - That's fine because you don't really need jQuery anyway

* The browser
    * The `navigator` object
        - Contains information about the browser itself
        - Version, enabled features and so on.
    * The `window` object
        - Refers to the browser window or tab
        - Includes location, navigation history and so on
        - It's the top object that contains all global variables
    * The `document` object
        - Contains the website being displayed inside the window
        - All elements, css and scripts are inside `document`.
        - DOM - Document Object Model
            + The API through which you can access all elements
            + `document.getElementBy<attribute>()` - oldschool
            + `document.querySelector()` - what cool kids do

![The browser API](https://fzero.github.io/lhl-lectures/assets/browser-api.svg)

* Events and event propagation
    - Events propagate outwards from the target
        + This means a `click` event on a button will also trigger `click` on a containing `<div>`
        + You can stop this with `<event>.stopPropagation()`
    * The event object
        - Contains all information about it, including the DOM element itself - `event.target`
    * `<element>.addEventListener()`
        - Attaches a function to an event
        - You can remove a listener with `<element>.removeEventListener()`

* Using DevTools
    * The REPL
    * Elements tab
    * Sources tab

## Bonus stuff

* Check out the [`http-server`](https://www.npmjs.com/package/http-server) npm package to serve your website in development mode.
* The poor-person's jQuery is included in [`code/app.js`](code/app.js).
