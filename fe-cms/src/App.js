import React, { useState, useEffect, useContext } from 'react';
import Footer from './utils/Footer';
import Navbar from './utils/Navbar';

function App() {
  const [obj, setData] = useState({
    imageName: null,
    imageDescription: null,
    imageFile: null
  });

  const uploadContent = () => {
    if (
      !this.state.imageName.length ||
      !this.state.imageDescription.length ||
      !this.state.imageFile.length
    ) {
      // trigger validation
      return;
    }
    const data = new FormData();

    data.append('imageName', obj.imageName);
    data.append('imageDescription', obj.imageDescription);
    data.append('imageFile', obj.imageFile);

    fetch('/image-content', {
      method: 'POST',
      body: data
    });
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
              setData({ ...obj, imageFile: e.target.files[0] });
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
      </div>
      <Footer />
    </div>
  );
}

export default App;
