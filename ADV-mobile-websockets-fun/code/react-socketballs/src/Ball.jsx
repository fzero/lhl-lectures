import React, { Component } from 'react'
import Draggable from 'react-draggable'

class Ball extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.client
    this.debouncer = null

    this.handleDrag = this.handleDrag.bind(this)
  }

  normalizeToPercentage(x, y) {
    var pixelWidth = document.documentElement.clientWidth
    var pixelHeight = document.documentElement.clientHeight

    return {
      x: (100 * x) / pixelWidth,
      y: (100 * y) / pixelHeight
    }
  }

  handleDrag(ev) {
    const pos = this.normalizeToPercentage(ev.pageX, ev.pageY)
    this.setState((prevState) => {
      let newState = prevState
      newState.x = pos.x
      newState.y = pos.y
      return newState
    })
    this.props.movementCallback(this.state)
  }

  render() {
    let classes = 'ball'

    if (this.props.isSelf) {
      classes += ' myself'
      const inlineStyle = {backgroundColor: this.state.color}
      return (
        <Draggable
          handle=".myself"
          onDrag={this.handleDrag}>
          <div className={classes} style={inlineStyle}>
            <span>{this.state.name}</span>
          </div>
        </Draggable>
      )
    }
    else {
      const inlineStyle = {
        backgroundColor: this.state.color,
        left: `${this.state.x}%`,
        top: `${this.state.y}%`
      }
      return (
        <div className={classes} style={inlineStyle}>
          <span>{this.state.name}</span>
        </div>
      )
    }
  }
}

export default Ball
