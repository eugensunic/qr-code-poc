import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalWindow(props) {
  const { content, handleClose, html } = props;
  const showLog = () => {
    console.log('modal window rendered', props.content);
  };

  return (
    <Modal show={content.modalShow} onHide={handleClose}>
      {showLog()}
      <Modal.Header closeButton>
        <Modal.Title>{content.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{html}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={content.handleAction}
          style={{
            backgroundColor: content.actionButtonColor,
            borderColor: content.actionButtonBorderColor
          }}
        >
          {content.actionButtonName}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;
