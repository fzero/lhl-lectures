import React, { Component } from 'react';

import Status from './Status.jsx'

const POST_LENGTH_MAX = 140;

class Header extends Component {
  constructor() {
    super();

    this.state = {
      content: '',
      error: '',
      visible: {
        compose: true
      }
    }

    this.onCompose = this.onCompose.bind(this);
    this.onContent = this.onContent.bind(this);
    this.onPost = this.onPost.bind(this);
  }

  onCompose(event) {
    this.setState((prev, props) => ({
      content: '',
      error: '',
      visible: {
        compose: !prev.visible.compose
      }
    }));
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  onPost(event) {
    const length = this.state.content.length;
    const state = {
      error: ''
    };

    if(length === 0) {
      state.error = `You cannot post an empty message.`;
    } else if(length > POST_LENGTH_MAX) {
      state.error = `You cannot post more than ${POST_LENGTH_MAX} characters.`;
    } else {
      this.props.onNewPost(this.state.content);
      state.content = '';
    }

    this.setState(state);
  }

  render() {
    return (
      <header className="container">
        <section className="brand">
          <img src="images/logo.png" />
          <span className="name">TWTR</span>
          <button
            className={ this.state.visible.compose ? 'compose close' : 'compose' }
            onClick={ this.onCompose }>
          </button>
        </section>
        {
          this.state.visible.compose &&
          <section className="create">
            <textarea
              className="textarea"
              onInput={ this.onContent }>
              { this.state.content }
            </textarea>
            <Status error={ this.state.error } count={ this.state.content.length } max={ POST_LENGTH_MAX } />
            <button className="post" onClick={ this.onPost }>POST</button>
          </section>
        }
      </header>
    )
  }
}

export default Header;
