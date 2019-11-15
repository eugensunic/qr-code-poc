import React, { useState, useEffect } from 'react';
import ModalWindow from '../utils/ModalWindow';

function OverviewContent() {
  const [content, setState] = useState({
    arr: [],
    imageName: null,
    imageDescription: null,
    imageSrc: null,
    itemId: null,
    modalShow: false,
    modalHeading: null,
    modalContent: null,
    actionButtonName: null,
    actionButtonColor: null,
    actionButtonBorderColor: null,
    actionHandler: null
  });

  const onChangeImageDescription = e => {
    console.log('inside the imageDescription callback func', content.modalShow);
    setState({ ...content, imageDescription: e.target.value });
  };

  const onChangeImageName = e => {
    console.log('inside the imageName callback func', content.modalShow);
    // setState({ ...content, imageName: e.target.value });
  };

  // useEffect(() => {
  //   if (!content.modalContent) return;
  //   console.log('side effect content', content.modalContent);
  //   // setState({
  //   //   ...setState,
  //   //   modalHeading: `Edit ${content.imageName}`,
  //   //   modalShow: true,
  //   //   imageName: content.imageName,
  //   //   imageDescription: content.imageDescription,
  //   //   imageSrc: content.imageSrc
  //   // });
  // }, [content.modalContent]);

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
            onChange={onChangeImageName}
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
            onChange={onChangeImageDescription}
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

  const invokeDeleteModal = (itemId, imageName) => {
    setState({
      ...content,
      modalShow: true,
      modalHeading: imageName,
      modalContent: `Are you sure you want to delete the selected item?`,
      actionButtonName: 'Delete',
      actionButtonBorderColor: '#dc3545',
      actionButtonColor: '#dc3545',
      handleAction: () => deleteItemConfirm(itemId)
    });
  };

  const invokeEditModal = (itemId, imageName, imageDescription, imageSrc) => {
    setState({
      ...content,
      modalShow: true,
      actionButtonName: 'Submit',
      actionButtonBorderColor: '#007bff',
      actionButtonColor: '#007bff',
      modalHeading: `Edit ${content.imageName}`,
      imageName: imageName,
      imageDescription: imageDescription,
      imageSrc: imageSrc,
      handleAction: () => editItemConfirm(itemId)
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

  // TO BE DONE
  const editItemConfirm = () => {};

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
        html={editContent()}
        content={content}
        handleClose={closeModal}
      />
    </div>
  );
}

export default OverviewContent;
