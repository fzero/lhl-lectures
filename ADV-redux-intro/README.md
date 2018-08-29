# Intro to Redux

[Redux](https://redux.js.org) is a global state management library that can be used (not only) with React. It's a good option for complex applications that require sharing state between components.

## Should I use it?

Redux is perfect when you have many components rendering the same dataset (e.g. a dashboard). It hit peak popularity around 2 years ago because of its tiny size (2kb minified/gzipped), good performance and excellent library support.

The downside is Redux **will** increase the complexity of your app. If the problem you want to solve involves sharing just one or two pieces of data with many components, React's [context API](https://reactjs.org/docs/context.html) might be a better option.

If you're not sharing much data among your components, it's usually best to stick to the usual `setState()` mechanics on simple applications.

## Code

The [code discussed in class](todos) is a slightly modified and commented version of the [To Do List example](https://redux.js.org/basics/exampletodolist) on the [Redux docs](https://redux.js.org/basics).

We've updated the code during class and added a _Delete_ button to our to do's. The updated code can be found in [`/todos-updated`](todos-updated).

## Additional resources

* [Free Redux video course by the creator of Redux!](https://egghead.io/courses/getting-started-with-redux)
* [A cartoon intro to Redux](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6)
* [A comparison of Redux and Mobx (another state management library)](https://hackernoon.com/introduction-to-redux-and-mobx-e6fa98b6479)
