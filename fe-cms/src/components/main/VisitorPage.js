import React, { useEffect, useState } from 'react';
import { contentEndpoint } from '../../config';

function VisitorPage(props) {
  const [obj, setState] = useState({
    imageName: '',
    imageDescription: '',
    imageSrc: ''
  });
  // BE validation hook
  useEffect(() => {
    fetch(contentEndpoint.VISITOR_PAGE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ qrCodeId: props.match.params.qrCodeId })
    })
      .then(res => {
        if (res.ok || res.status === 401) {
          return res.json();
        }
        throw new Error();
      })
      .then(res => {
        setState({
          ...obj,
          imageName: res.imageName,
          imageDescription: res.imageDescription,
          imageSrc: res.imageSrc
        });
      })

      .catch(_ => {});
  }, []);
  return (
    <div className="container">
      <h4 className="text-center">Visitor page</h4>
      <div id="client-content">
        <p>Image name:{obj.imageName}</p>
        <p>Image description:{obj.imageDescription}</p>
        <img src={obj.imageSrc}></img>
      </div>
    </div>
  );
}

export default VisitorPage;
