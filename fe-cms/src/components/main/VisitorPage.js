import React, { useEffect, useState } from 'react';

import { contentEndpoint, DOMAIN_NAME } from '../../config';

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
    <div className="visitorArticle">
      <div id="client-content">
        <h1 className="text-center h-md">{obj.imageName}</h1>
        <div className="col text-center">
          <img src={DOMAIN_NAME + obj.imageSrc} className="img-fluid" />
        </div>
        <p>{obj.imageDescription}</p>
      </div>
      <div className="row"></div>
    </div>
  );
}

export default VisitorPage;
