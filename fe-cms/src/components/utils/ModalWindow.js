import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function ModalWindow(props) {
  const { html, handleClose, handleAction } = props;
  const { modal, actionButton, showSubmitButton } = props.content;
  const { t } = useTranslation();

  return (
    <Modal show={modal.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modal.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{html}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('Close')}
        </Button>
        {showSubmitButton && (
          <Button
            variant="primary"
            onClick={handleAction}
            style={{
              backgroundColor: actionButton.color,
              borderColor: actionButton.borderColor
            }}
          >
            {actionButton.name}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;
