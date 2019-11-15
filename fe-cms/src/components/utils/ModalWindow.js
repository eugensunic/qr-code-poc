import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalWindow(props) {
  const { handleClose, html } = props;
  const {
    modalShow,
    modalHeading,
    handleAction,
    actionButtonBorderColor,
    actionButtonColor,
    actionButtonName,
    showSubmitButton
  } = props.content;

  return (
    <Modal show={modalShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{html}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {showSubmitButton && (
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
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;
