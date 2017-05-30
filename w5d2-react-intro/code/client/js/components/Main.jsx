import React, { Component } from 'react';

import PostSeries from './PostSeries.jsx';

class Main extends Component {
  render() {
    return (
      <main className="container">
        <PostSeries posts={ this.props.posts } />
      </main>
    )
  }
}

export default Main;
