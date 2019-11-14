import React, { useState, useEffect } from 'react';
import ModalWindow from '../utils/ModalWindow';

function OverviewContent() {
  const [content, setState] = useState({
    arr: [],
    itemId: null,
    modalShow: false,
    modalHeading: null,
    modalContent: null,
    actionButtonName: null,
    actionButtonColor: null,
    actionButtonBorderColor: null,
    actionHandler: null
  });

  const invokeDeleteModal = itemId => {
    setState({
      ...content,
      modalShow: true,
      modalContent: `Are you sure you want to delete the selected item?`,
      actionButtonName: 'Delete',
      actionButtonBorderColor: '#dc3545',
      actionButtonColor: '#dc3545',
      handleAction: () => deleteItem(itemId)
    });
  };

  const invokeEditModal = itemId => {
    setState({
      ...content,
      modalShow: true,
      actionButtonName: 'Submit',
      actionButtonBorderColor: '#007bff',
      actionButtonColor: '#007bff',
      handleAction: () => editItem(itemId)
    });
  };

  const deleteItem = itemId => {
    fetch('/overview-content/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        itemId: itemId
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('error');
      })
      .then(_ =>
        setState({
          ...content,
          arr: content.arr.map(array => array.filter(x => x.id !== itemId))
        })
      )
      .catch(err => console.log(err));
  };

  const editItem = () => {};

  const closeModal = () => {
    setState({ ...content, modalShow: false });
  };

  const openImageModal = () => {
    console.log('open image modal');
  };

  useEffect(() => {
    fetch('/overview-content')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('error');
      })
      .then(x => setState({ ...content, arr: x }))
      .then(_ => console.log(content))
      .catch(err => console.log(err));
  }, []);

  if (!content.arr.length) {
    return <div className="empty-content">No content added yet!</div>;
  }
  return (
    <div className="container">
      {content.arr.map((arr, i) => (
        <div key={i} className="row">
          {arr.map((obj, j) => (
            <div key={j} className="col-sm-12 col-md-4 overview-item">
              <button
                type="button"
                className="btn btn-danger d-inline"
                onClick={() => invokeDeleteModal(obj.id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-warning d-inline ml-1"
                onClick={() => invokeEditModal(obj.id)}
              >
                Edit
              </button>
              <div className="row">
                <div className="col-xs-12 col-sm-6 ">
                  <h5 className="text-wrapper">{obj.imageName}</h5>
                  <img width="170" src={obj.path} onClick={openImageModal} />
                  <p className="text-wrapper">{obj.imageDescription}</p>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <img width="170" src={obj.qrCode} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <ModalWindow
        show={content.modalShow}
        content={content.modalContent}
        heading={content.modalHeading}
        actionButtonName={content.actionButtonName}
        actionButtonColor={content.actionButtonColor}
        actionButtonBorderColor={content.actionButtonBorderColor}
        handleAction={content.handleAction}
        handleClose={closeModal}
      />
    </div>
  );
}

export default OverviewContent;
