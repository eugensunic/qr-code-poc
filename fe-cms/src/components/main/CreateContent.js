import React, { useState, useContext } from 'react';
import { GlobalErrorContext } from '../../App';

function CreateContent() {
  const errorContext = useContext(GlobalErrorContext);
  const [obj, setData] = useState({
    imageName: null,
    imageNameError: false,
    imageDescription: null,
    imageDescriptionError: false,
    imageFiles: [],
    imageFilesError: false,
    qrCode: null
  });

  const isFrontendValid = () => {
    return obj.imageName && obj.imageDescription && obj.imageFiles.length;
  };

  const uploadContent = () => {
    let imageNameErr = false;
    let imageDescriptionErr = false;
    let imageFilesErr = false;

    if (!isFrontendValid()) {
      if (!obj.imageName) {
        imageNameErr = true;
      }
      if (!obj.imageDescription) {
        imageDescriptionErr = true;
      }
      if (!obj.imageFiles.length) {
        imageFilesErr = true;
      }
      setData({
        ...obj,
        imageNameError: imageNameErr,
        imageDescriptionError: imageDescriptionErr,
        imageFilesError: imageFilesErr
      });
      return;
    }
    const form = new FormData();

    form.append('file', obj.imageName);
    form.append('file', obj.imageDescription);
    form.append('file', obj.imageFiles[0]);

    console.log(form.getAll('file'));
    fetch('/create-content', {
      method: 'POST',
      body: form,
      credentials: 'include'
    })
      .then(res => res.json())
      .then(x => setData({ ...obj, qrCode: x }))
      .catch(_ =>
        errorContext.dispatchError({
          type: 'global',
          payload: 'Server error ocurred'
        })
      );
  };

  return (
    <div className="container main-wrapper">
      <div className="row">
        <h2></h2>
      </div>
      <div className="row">
        <input
          id="image-name"
          type="text"
          name="image-name"
          placeholder="Image name"
          className={obj.imageNameError ? 'error-input-container' : ''}
          onChange={e =>
            setData({
              ...obj,
              imageName: e.target.value,
              imageNameError: false
            })
          }
        />
      </div>
      <div className="row">
        <textarea
          id="image-description"
          name="image-description"
          placeholder="Image description"
          rows="20"
          cols="40"
          className="ui-autocomplete-input"
          autoComplete="off"
          role="textbox"
          className={obj.imageDescriptionError ? 'error-input-container' : ''}
          onChange={e =>
            setData({
              ...obj,
              imageDescription: e.target.value,
              imageDescriptionError: false
            })
          }
        ></textarea>
      </div>
      <div className="row">
        <input
          id="image-file"
          type="file"
          name="image-file"
          accept="image/*"
          className={obj.imageFilesError ? 'error-input-container' : ''}
          onChange={e => {
            setData({
              ...obj,
              imageFiles: e.target.files,
              imageFilesError: false
            });
          }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-lg btn-primary btn-block text-uppercase mt-2"
        onClick={uploadContent}
      >
        Submit
      </button>
      {obj.qrCode && (
        <div id="preview-mode">
          <h3 className="qr-code-message">
            Your QR code was successfully stored to the database!
          </h3>
          <img id="qr-code" src={obj.qrCode} className="mx-auto d-block" />
        </div>
      )}
    </div>
  );
}

export default CreateContent;
