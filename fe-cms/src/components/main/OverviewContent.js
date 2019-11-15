import React, { useState, useEffect } from 'react';
import ModalWindow from '../utils/ModalWindow';

function OverviewContent() {
  const [content, setState] = useState({
    arr: [],
    mode: null,
    showSubmitButton: true,
    qrCodePath: null,
    imageName: null,
    imageDescription: null,
    imageSrc: null,
    itemId: null,
    modalShow: false,
    imageModalShow: false,
    modalHeading: null,
    modalContent: null,
    actionButtonName: null,
    actionButtonColor: null,
    actionButtonBorderColor: null,
    actionHandler: null
  });

  const htmlContent = mode => {
    switch (mode) {
      case 'EDIT':
        return editContent();
      case 'DELETE':
        return deleteContent();
      case 'ZOOM':
        return qrCodeContent();
      default:
        return '';
    }
  };

  const editContent = () => {
    return (
      <div className="container main-wrapper">
        <div className="row">
          <h2></h2>
        </div>
        <span>Image name:</span>
        <div className="row">
          <input
            id="image-name"
            name="image-name"
            type="text"
            value={content.imageName}
            placeholder="Image name"
            onChange={e => setState({ ...content, imageName: e.target.value })}
          />
        </div>
        <span>Image description:</span>
        <div className="row">
          <textarea
            id="image-description"
            name="image-description"
            value={content.imageDescription}
            placeholder="Image description"
            rows="20"
            cols="40"
            className="ui-autocomplete-input"
            autoComplete="off"
            role="textbox"
            onChange={e =>
              setState({ ...content, imageDescription: e.target.value })
            }
          ></textarea>
        </div>
        <span>Current image:</span>
        <img width="170" src={content.imageSrc} style={{ display: 'block' }} />
        <div className="row">
          <input
            id="image-file"
            name="image-file"
            type="file"
            accept="image/*"
          />
        </div>
      </div>
    );
  };

  const deleteContent = () => {
    return <p>Are you sure you want to delete the selected item?</p>;
  };

  const qrCodeContent = () => {
    return <img width="400" height="400" src={content.qrCodePath} />;
  };

  const invokeDeleteModal = (itemId, imageName) => {
    setState({
      ...content,
      mode: 'DELETE',
      showSubmitButton: true,
      modalShow: true,
      modalHeading: `Delete ${imageName}`,
      actionButtonName: 'Delete',
      actionButtonBorderColor: '#dc3545',
      actionButtonColor: '#dc3545',
      handleAction: () => deleteItemConfirm(itemId)
    });
  };

  const invokeEditModal = (itemId, imageName, imageDescription, imageSrc) => {
    setState({
      ...content,
      mode: 'EDIT',
      showSubmitButton: true,
      modalShow: true,
      actionButtonName: 'Submit',
      actionButtonBorderColor: '#007bff',
      actionButtonColor: '#007bff',
      modalHeading: `Edit ${imageName}`,
      imageName: imageName,
      imageDescription: imageDescription,
      imageSrc: imageSrc,
      handleAction: () => editItemConfirm(itemId)
    });
  };

  const invokeQrCodeModal = (path, imageName) => {
    setState({
      ...content,
      modalShow: true,
      showSubmitButton: false,
      modalHeading: `QR code for ${imageName}`,
      mode: 'ZOOM',
      qrCodePath: path
    });
  };

  const deleteItemConfirm = itemId => {
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

  const editItemConfirm = itemId => {
    // fetch('/overview-content/edit', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     itemId: itemId
    //   })
    // })
    //   .then(res => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     throw new Error('error');
    //   })
    //   .then(_ => {
    //     console.log('EDIT SUCCESSFUL');
    //   })
    //   .catch(err => console.log(err));
  };

  const closeModal = () => {
    setState({ ...content, modalShow: false });
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
                onClick={() => invokeDeleteModal(obj.id, obj.imageName)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-warning d-inline ml-1"
                onClick={() =>
                  invokeEditModal(
                    obj.id,
                    obj.imageName,
                    obj.imageDescription,
                    obj.path
                  )
                }
              >
                Edit
              </button>
              <div className="row">
                <div className="col-xs-12 col-sm-6 ">
                  <h5 className="text-wrapper">{obj.imageName}</h5>
                  <img width="170" src={obj.path} />
                  <p className="text-wrapper">{obj.imageDescription}</p>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <img
                    width="170"
                    src={obj.qrCode}
                    onClick={() => invokeQrCodeModal(obj.qrCode, obj.imageName)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <ModalWindow
        html={htmlContent(content.mode)}
        content={content}
        handleClose={closeModal}
      />
    </div>
  );
}

export default OverviewContent;
