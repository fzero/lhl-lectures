# React

### Slides in react.pdf and git repo at [https://github.com/jensen/react-notes](https://github.com/jensen/react-notes)

The documentation from Facebook is excellent. It is definitely worth reading all of the [Quick Start](https://facebook.github.io/react/docs/hello-world.html) section.

> I have not tested this webpack configuration with vagrant. If you end up running the project using vagrant please let me know if it works or doesn't.

## Objectives

- Components & Lifecycle
- Props & State
- The Flow of Data
- Events

## Thinking in Components

When we develop user interfaces in React we need to think about he user interface as a collection of `components`. Typically we want to start iterating on the structure of the UI as a wireframe. It is quick and inexpensive to iterate on. Once we are happy with the layout of the interface we can move to a visual design tool. The wireframe helps us create a structure as html, and the visual design helps us setup our stylesheets.

The third phase in the design process is the creation of the interface as a static html file that will be converted into React components. It is a lot easier to iterate on the css and html in a static file.

In the example today we created components to represent `<App />, <Header />, <Status />,  <Main />, <PostSeries /> and <Post />`. Components have props & state. Props are passed into a component from outside, and state is managed inside.

> A React component cannot change it’s props.

> A React component can change it’s own state.

### The Component Lifecyle

There are three phases to the life of a component. **Mount**, **Update** and **Unmount**.

The mount lifecycle functions are called when the component is created and only called once, the update lifecycle functions are called whenever a state update within a component is triggered and the unmount lifecycle function is called when the component is about to be destroyed.

The methods that we are most interested in for the next week are:

```javascript
constructor()
componentDidMount()
render()
```

## Props & State

Once we enter the update phase of the lifecycle the component will re-render when the props change from it's parent or `setState()` is called.

If we are going to call `setState()` there are a few things we need to understand.

- We don't modify state directly.
- State updates are merged.
- State updates may be asynchronous.

You can read more about this at [Using State Correctly](https://facebook.github.io/react/docs/state-and-lifecycle.html#using-state-correctly)


## The Flow of Data

Data only flows in one direction. We pass state from parent to child, down the component tree using props. A component like `<App />` would have state (the posts) that is passed as a prop to the `<Main />`.

We want to trigger an update to the parent components state. We do this by passing a function to `<Header />` as a prop that can be called when the POST button is clicked.

## Handling Events

We can trigger any of the standard DOM events. We just need to use the React style jsx sytax to do it.

```javascript
<button onClick={ this.onPost }></button>
```

- We use camelCase to describe the event we want to receive a callback for.
- We use the { open/close js code } syntax to pass a function reference to our element.

## Building Twtr in React

The master branch contains the completed app. There is a feature/base branch that contains an empty React app. This was the starting point for the coding exercise.

When working in react use both the Chrome Tools extension and the console output. Look for warnings and errors. React is pretty informative when you do something wrong.

Starting with an empty react app, create a message posting app following these steps:

### 1. Copy html layout into App.jsx

We take the entire layout.html file and copy everything within the `<body>` into our `App.jsx` render method.

### 2. Convert class and other reserved names to React versions

There are certain reserved words in .jsx that cannot be used as props/attributes. One of these words is `class`. We need to convert all of our `class` attributes into `className` attributes.

### 3. Break html into separate components to create a hierarchy

Creating new files for each component we continue keep taking html from our parent component and use that to create child components. Two good criteria for something needing tbe a component are:

1. Anything that needs to be self contained or encapsulated.
2. Anything that repeats either as a list, or is used in multiple areas of the interface.

### 4. Add state to App.jsx to manage the current posts

This is where we create the `constructor()` in the `App.jsx` class. The constructor is the only place where we make a direct assignment to `this.state`.

```javascript
class App extends Component {
  constructor(props) {
    /*
       If we add a constructor we need to call
       `super()` to also call the constructor
       of the Component class.
    */
    super(props);

    /* If we need access to props, we use the
       value passed to the constructor instead
       of this.props. Everywhere else in the class
       you use this.props.
    */

    /*
       The state of our component has a single key
       called posts that contains an empty array.
    */
    this.state = {
      posts: []
    }
  }
}
```

In the example we copied an array of posts from our api reponse and pasted it into a `data.json` file that we imported at the top of `App.jsx`. That gave us data to use when intializing state.

### 5. Pass the posts to the child components as a prop

Now we get to start the flow of data down the component hierarchy. We simply pass `this.state.posts` to `<Main />` as a prop.

> App.jsx

```javascript
render() {
  return (
    <div>
      <Main posts={ this.state.posts } />
    </div>
  )
}
```

Sometimes we need to pass props to another component as props.

> Main.jsx

```javascript
render() {
  return (
    <div>
      <PostSeries posts={ this.props.posts } />
    </div>
  )
}
```

This was because `Main.jsx` is between `App.jsx` and `PostSeries.jsx`.

### 6. In the posts series component map over the posts array

We have an array of posts. We need an array of react elements. When following this pattern of maping through an array and generating many copies of the same component, we need provide React with a unique `key` for each. A common warning is `Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of 'PostSeries'.` In our example below we huse the `post.id` to represent a unique post.

React uses this key to determine what needs to be rendered.

> PostSeries.jsx

```javascript
  render() {
    const posts = this.props.posts.map(post => {
      return <Post
        key={ post.id }
        user={ post.user }
        content={ post.content }
        date={ post.date }
        likes={ post.likes } />
    });

    return (
      <section>
        { posts }
      </section>
    )
  }
```

### 7. In the post component use the props to replace the static content

```javascript
render() {
  return (
    <article>
      <header>
        <img src={ this.props.user.avatar } />
        <span>
          <div>{ this.props.user.full }</div>
          <div>{ this.props.date }</div>
        </span>
      </header>
      <p>{ this.props.content }</p>
    </article>
  )
}
```

### 8. In the header setup the content state

We create a `constructor()` and initialize `this.state` with a single property `content`. We want the content in the text field to be empty on initialization so we set content to an empty string.

> Remember this has to go in the `constructor`. Never set state directly, always use `setState()`

```javascript
this.state = {
  content: ''
}
```

### 9. Pass the current and maximum character count to the status bar as props

If we forgot to create a Status component then we would do that now.

> Header.jsx

```javascript
render() {
  return (
    <header>
      <section>
        <Status count={ this.state.content.length } max={ 140 } />
      </section>
    </header>
  )
}
```

### 10. In the status bar render the character counter, changing the style when max is reached

```javascript
render() {
  const { count, max } = this.props;

  return (
    <div className="status">
      <span className={ this.props.count > this.props.max ? 'counter over' : 'counter' }>{ this.props.count }</span>
    </div>
  )
}
```

### 11. Setup an event handler to trigger an update to the content on input

In our text input field we add an event that will be triggered whenever there is input.

```javascript
onInput={ this.onContent }
```

The `onContent` function would be created inside the `<Header />` component.

```javascript
onContent(event) {
  this.setState({
    content: event.target.innerText
  });
}
```

> Remember that we are working with objects and `this` context now. We could bind in the constructor to enforce the context of our `onContent` function. A common error is: `Uncaught TypeError: Cannot read property 'setState' of null` this is saying that when we are trying to call setState on `this` which is null. We intended `this` to be `<Header />` component.

```javascript
this.onContent = this.onContent.bind(this);
```

- [What is this?](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch1.md#whats-this)
- [MDN Bind Reference](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)

### 12. Pass a function to the header that it can call when a new post is created

> App.jsx

```javascript
onNewPost(content) {
  console.log(content);
}

render() {
  return (
    <div>
      <Header onNewPost={ this.onNewPost } />
    </div>
  )
}
```

We expect the `<Header />` to pass it's content back to the `<App />` through the `onNewPost` function. For now we can just log out the results.

### 13. Setup an event handler to use the function, passed as a prop

> Header.jsx

```javascript
onPost() {
  this.props.onNewPost(this.state.content);
}

render() {
  return (
    <button className="post" onClick={ this.onPost }>POST</button>
  )
}
```

> We are passing functions around inside objects again. Make sure you are binding the correct `this` context.

### 14. In the header create the error state and pass it as a prop to the status

Since `<Header />` has a constructor already with an initial state, we can just add `error` and pass it as a prop.

> Header.jsx

```javascript
<Status error={ this.state.error } />
```

We would also need to setup the logic to check to see if the content is empty or longer than 140 characters. We write that condition in the `onPost()` function.

### 15. Show the error text if it is not empty

Sometimes we want to render things conditionally. We can use state, or props for this condition. In this case we just want to   conditonally render the tag that shows the error, based on the value of `this.props.error`.

> Status.jsx

```javascript
render() {
  return (
    <div>
      { this.props.error && <span className="error">{ this.props.error }</span> }
    </div>
  )
}
```

[Conditional Render with &&](https://facebook.github.io/react/docs/conditional-rendering.html#inline-if-with-logical--operator)

### 16. Switch from hard coded posts to json that uses a fetch (ajax) call

I've created a helper file in `./lib/api.js` that allows me to make ajax-style requests with fetch.

> App.jsx

```javascript
load() {
  Api.get('/messages').then(posts => {
    this.setState({
      posts
    });
  });
}

componentDidMount() {
  this.load();
}
```

This is the third lifecycle method that we will be using. The `componentDidMount` function is called by React after the component and all of it's children have rendered for the first time. When the component is rendered we do an HTTP request that will get back an array of posts. We take that array of posts and assign it to our `<App />` state to trigger a render.


### 17. Save the new post to the database in the App.jsx post handler function

```javascript
onPost() {
  Api.post('/messages', { content }).then(() => this.load());
}
```

Here is another situation where we need to be aware of `this` context. By wrapping it in an arrow function we force the context to be the declared context. In this cass it's `<App />`.


### 18. Toggle the visibility of the compose window

If we want to create a button that shows and hides content, we need to do four things.

1. Add a flag to the state that can be toggled on and off.
2. Add an event handler to the button your want to trigger the show/hide.
3. Call a function inside your class that uses setState to toggle betwee true/false.

```javascript
onCompose() {
  this.setState({
    compose: !this.state.compose
  });
}
```

4. Use a condition inside the render method to toggle the rendering of the target dom elements.

```javascript
render() {
  return (
    <div>
      { this.state.compose &&
        <section>
          <div>Toggled</div>
        </section> }
    </div>
  )
}
```

## Bonus

Use the Chrome Developer Tools as much as possible. When we transpile our source code into browser compliant ES5 we end up making it more difficult to debug. With webpack we can generate a Source Map. This maps the lines inside the source code to lines inside the generated code.

In the webpack [devtool](https://webpack.js.org/configuration/devtool/#devtool) documentation they give us a table of different options. `eval-source-map` is commonly used for debugging and will give you access to the original ES6 source code.

With the React Debug Extension you can do cool things like toggle true/false values or change the value of state. You can also see the props and state of a component in the dom for the current state of the application.

