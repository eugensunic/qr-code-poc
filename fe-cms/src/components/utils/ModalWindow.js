import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalWindow(props) {
  const {
    handleClose,
    handleAction,
    show,
    actionButtonName,
    actionButtonColor,
    actionButtonBorderColor,
    content,
    heading
  } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleAction}
          style={{
            backgroundColor: actionButtonColor,
            borderColor: actionButtonBorderColor
          }}
        >
          {actionButtonName}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;
