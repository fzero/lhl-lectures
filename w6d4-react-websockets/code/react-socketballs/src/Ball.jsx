import React from 'react'
import Draggable from 'react-draggable'

const Ball = (props) => {

  const normalizeToPercentage = (x, y) => {
    var pixelWidth = document.documentElement.clientWidth
    var pixelHeight = document.documentElement.clientHeight

    return {
      x: (100 * x) / pixelWidth,
      y: (100 * y) / pixelHeight
    }
  }

  const handleDrag = (ev) => {
    const { client, movementCallback } = props
    const pos = normalizeToPercentage(ev.pageX, ev.pageY)
    const updatedClient = Object.assign(
      {},
      client,
      {x: pos.x, y: pos.y}
    )
    movementCallback(updatedClient)
  }


  const { client, isSelf } = props
  let classes = 'ball'

  if (isSelf) {
    classes += ' myself'
    const inlineStyle = {backgroundColor: client.color}
    return (
      <Draggable
        handle=".myself"
        onDrag={handleDrag}>
        <div className={classes} style={inlineStyle}>
          <span>{client.name}</span>
        </div>
      </Draggable>
    )
  }
  else {
    const inlineStyle = {
      backgroundColor: client.color,
      left: `${client.x}%`,
      top: `${client.y}%`
    }
    return (
      <div className={classes} style={inlineStyle}>
        <span>{client.name}</span>
      </div>
    )
  }
}

export default Ball
