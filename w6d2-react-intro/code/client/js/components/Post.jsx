import React, { Component } from 'react';

class Post extends Component {
  render() {
    return (
      <article className="post">
        <header className="post">
          <img className="avatar" src={ this.props.user.avatar } />
          <span className="user">
            <div className="name">{ this.props.user.full }</div>
            <div className="date">{ this.props.date }</div>
          </span>
        </header>
        <p>{ this.props.content }</p>
      </article>
    )
  }
}

export default Post;
