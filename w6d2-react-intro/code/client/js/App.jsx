import React, { Component } from 'react';

import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

import Api from './lib/api.js';

require('../scss/main.scss');

/*

  1.   Copy html layout into App.jsx.
  2.   Convert class and other reserved names to React versions.
  3.   Break html into separate components to create a hierarchy.
  4.   Add state to App.jsx to manage the current posts.
  5.   Pass the posts to the child components as a prop.
  6.   In the posts series component map over the posts array.
  7.   In the posts component use the prop to replace the static content.
  8.   In the header setup the content state.
  9.   Pass the current and maximum character count to the status bar as props.
  10.  In the status bar render the character counter, changing the style when max is reached.
  11.  Setup an event handler to trigger an update to the content on input.
  12.  Pass a function to the header that it can call when a new post is created.
  13.  Setup an event handler to use the function, passed as a prop.
  14.  In the header create the error state and pass it as a prop to the status.
  15.  Show the error text if it is not empty.
  16.  Switch from hard coded posts to json that uses a fetch (ajax) call.
  17.  Save the new post to the database in the App.jsx post handler function.
  18.  Toggle the visibility of the compose window.

*/

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.onNewPost = this.onNewPost.bind(this);
  }

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

  onNewPost(content) {
    Api.post('/messages', { content }).then(() => this.load());
  }

  render() {
    return (
      <div>
        <Header onNewPost={ this.onNewPost } />
        <Main posts={ this.state.posts } />
      </div>
    )
  }
}

export default App;
