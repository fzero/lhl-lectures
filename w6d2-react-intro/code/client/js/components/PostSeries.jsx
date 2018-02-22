import React, { Component } from 'react';

import Post from './Post.jsx';

class PostSeries extends Component {
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
      <section className="posts">
        { posts }
      </section>
    )
  }
}

export default PostSeries;
