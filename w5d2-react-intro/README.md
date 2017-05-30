# A proper React intro

React is a client-side **framework** to build interactive user interfaces easily. Due to some stubborness from the Facebook engineering team, React was always sold as "just a library", but to properly use it you need much more that just a `<script>` tag on your HTML.

In yesterday's tooling video you were introduced to Webpack, Babel and a primitive React example. Today we'll explore how to build a slightly more complex example app and understand how data and actions flow in a React application.

## First things first: the easy way to get things going

Until very recently there was no standardized way to start a React app. You either had to wire together Webpack and Babel manually or download one of the thousands ([literally](https://github.com/search?utf8=%E2%9C%93&q=react+starter+kit&type=)) of React starter kits out there.

Luckily for us, those days are gone! Facebook released the [create-react-app](https://github.com/facebookincubator/create-react-app) npm package which makes everything much easier.

To get started, just do this:
```sh
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start
```

It's also strongly recommeneded that you install the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) chrome extension.

## The main idea

I'm unashamedly borrowing the excellent [slides](react.pdf) and [code](code) made by LHL Vancouver instructor [Karl Jensen](https://github.com/jensen/react-notes) to illustrate this section, but here's a quick breakdown:

React works by breaking down the user interface of an app into **components**.

Components can render HTML and handle user actions. They can also be nested just like regular HTML tags. In fact, they _look_ like HTML tags, since React uses [JSX](https://facebook.github.io/jsx/). Components are usually defined as Javascript classes (introduced with ES6 syntax).

Each component can receive some data in the form of **properties** (or **props**), which look pretty much like HTML attributes. Once props are received, they cannot be changed. Think of them as function arguments.

Components can also have an internal **state**, which reflects how a certain component looks like at a given time. Every time the state changes, the component is re-rendered.

The state should **not** be treated as a regular variable. While you can _read_ from it regularly, you must update it with `setState()` so that the component can be re-rendered properly.

## The component lifecycle

There are a couple of predefined functions/methods that are called at different stages in the life of a component. For this week's project we'll concentrate on three main ones:

* `constructor()` - Called when a component is **created**. Receives props and (optionally) sets the initial state.
* `componentDidMount()` - Called when a component is first **displayed**. This is where you should add any ajax calls to fetch data from a server.
* `render()` - The function that actually does the rendering.

## Additional resources

* [Original lecture notes and code by Karl Jensen](https://github.com/jensen/react-notes) - very detailed and recommended!
* [10 React mini-patterns](https://hackernoon.com/10-react-mini-patterns-c1da92f068c5) is an excellent article for people just getting started with React.
* [The official React documentation](https://facebook.github.io/react/docs/hello-world.html) is slightly confusing (especially when switching from functional to class-based style), but it's a handy reference nevertheless. You might be better off following...
* ...[the official React turotial](https://facebook.github.io/react/tutorial/tutorial.html) instead.
