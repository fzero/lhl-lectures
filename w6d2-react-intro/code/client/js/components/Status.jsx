import React, { Component } from 'react';

class Status extends Component {
  render() {
    const klass = this.props.count > this.props.max ? 'counter over' : 'counter';

    return (
      <div className="status">
        <span className={ klass }>{ this.props.count }</span>
        { this.props.error && <span className="error">{ this.props.error }</span> }
      </div>
    )
  }
}

export default Status;
