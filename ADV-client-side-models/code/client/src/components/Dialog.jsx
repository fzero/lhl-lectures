import React from 'react'
import {Modal} from 'react-bootstrap'

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
