import React, { useState, useEffect } from 'react';
import ModalWindow from '../utils/ModalWindow';

function OverviewContent() {
  const [content, setState] = useState({
    overviewArr: [],
    modeType: null,
    showSubmitButton: true,
    qrCodePath: null,
    itemId: null,
    image: {
      name: null,
      description: null,
      src: null
    },
    modal: {
      show: false,
      heading: null,
      content: null
    },
    actionButton: {
      name: null,
      color: null,
      borderColor: null,
      handler: null
    }
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
  // HTML CONTENT BEGIN
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
            value={content.image.name}
            placeholder="Image name"
            onChange={e =>
              setState({
                ...content,
                image: { ...content.image, name: e.target.value }
              })
            }
          />
        </div>
        <span>Image description:</span>
        <div className="row">
          <textarea
            id="image-description"
            name="image-description"
            value={content.image.description}
            placeholder="Image description"
            rows="20"
            cols="40"
            className="ui-autocomplete-input"
            autoComplete="off"
            role="textbox"
            onChange={e =>
              setState({
                ...content,
                image: { ...content.image, description: e.target.value }
              })
            }
          ></textarea>
        </div>
        <span>Current image:</span>
        <img width="170" src={content.image.src} style={{ display: 'block' }} />
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

  // HTML CONTENT END

  // HTML MODAL BEGIN
  const invokeDeleteModal = (itemId, imageName) => {
    setState({
      ...content,
      modeType: 'DELETE',
      showSubmitButton: true,
      modal: { ...content.modal, show: true, heading: `Delete ${imageName}` },
      actionButton: {
        name: 'Delete',
        color: '#dc3545',
        borderColor: '#dc3545',
        handler: () => deleteItemConfirm(itemId)
      }
    });
  };

  const invokeEditModal = (itemId, imageName, imageDescription, imageSrc) => {
    setState({
      ...content,
      modeType: 'EDIT',
      showSubmitButton: true,
      modal: {
        ...content.modal,
        show: true,
        heading: `Edit ${imageName}`
      },
      image: {
        ...content.image,
        name: imageName,
        description: imageDescription,
        src: imageSrc
      },
      actionButton: {
        name: 'Submit',
        color: '#007bff',
        borderColor: '#007bff',
        handler: () => editItemConfirm(itemId)
      }
    });
  };

  const invokeQrCodeModal = (path, imageName) => {
    setState({
      ...content,
      modeType: 'ZOOM',
      showSubmitButton: false,
      modal: {
        ...content.modal,
        show: true,
        heading: `QR code for ${imageName}`
      },
      qrCodePath: path
    });
  };

  // HTML MODAL END
  // MODAL CONFIRM BUTTON BEGIN
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
          overviewArr: content.overviewArr.map(array =>
            array.filter(x => x.id !== itemId)
          )
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

  // MODAL CONFIRM BUTTON END

  const closeModal = () => {
    setState({ ...content, modal: { ...content.modal, show: false } });
  };

  useEffect(() => {
    fetch('/overview-content')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('error');
      })
      .then(x => setState({ ...content, overviewArr: x }))
      .then(_ => console.log(content))
      .catch(err => console.log(err));
  }, []);

  if (!content.overviewArr.length) {
    return <div className="empty-content">No content added yet!</div>;
  }
  return (
    <div className="container">
      {content.overviewArr.map((arr, i) => (
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
        html={htmlContent(content.modeType)}
        content={content}
        handleClose={closeModal}
      />
    </div>
  );
}

export default OverviewContent;
