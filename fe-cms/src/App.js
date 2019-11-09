import React, { useState, useEffect, useContext } from 'react';
import Footer from './utils/Footer';
import Navbar from './utils/Navbar';

function App() {
  const [obj, setData] = useState({
    imageName: null,
    imageDescription: null,
    imageFiles: null,
    qrCode: null
  });

  const uploadContent = () => {
    console.log('obj here', obj);
    if (!obj.imageName || !obj.imageDescription || !obj.imageFiles.length) {
      // trigger validation
      return;
    }
    const form = new FormData();

    form.append('file', obj.imageName);
    form.append('file', obj.imageDescription);
    form.append('file', obj.imageFiles[0]);

    console.log(form.getAll('file'));
    fetch('/image-content', {
      method: 'POST',
      body: form
    })
      .then(res => res.json())
      .then(x => setData({ ...obj, qrCode: x }));
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <h2></h2>
        </div>
        <div className="row">
          <input
            id="image-name"
            name="image-name"
            type="text"
            placeholder="Image name"
            onChange={e => setData({ ...obj, imageName: e.target.value })}
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
            onChange={e =>
              setData({ ...obj, imageDescription: e.target.value })
            }
          ></textarea>
        </div>
        <div className="row">
          <input
            id="image-file"
            name="image-file"
            type="file"
            accept="image/*"
            onChange={e => {
              setData({ ...obj, imageFiles: e.target.files });
            }}
          />
        </div>
        <button
          className="btn btn-lg btn-primary btn-block text-uppercase mt-2"
          type="submit"
          onClick={uploadContent}
        >
          Submit
        </button>
        <div id="preview-mode" className="row text-center">
          {obj.qrCode && <img src={obj.qrCode} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
