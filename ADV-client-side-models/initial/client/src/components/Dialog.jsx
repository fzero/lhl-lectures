import React from 'react'
import {Modal} from 'react-bootstrap'

/*
Props:
show (Boolean): true if the dialog should be displayed
onHide (Function): callback for the close dialog button
title (String/Component): dialog title
children (Components): Contents of the dialog
footer (Component): Footer contents
*/
const Dialog = (props) => (
  <Modal
    show={props.show}
    onHide={props.onHide}
    className='dialog-modal'>

    <Modal.Header closeButton>
      <Modal.Title>
        {props.title}
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {props.children}
    </Modal.Body>

    {props.footer &&
      <Modal.Footer>
        {props.footer}
      </Modal.Footer>
    }
  </Modal>
)

export default Dialog
