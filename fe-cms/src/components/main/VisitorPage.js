import React, { useEffect, useState } from "react";
import { contentEndpoint, DOMAIN_NAME } from "../../config";
import Speech from "speak-tts";

let speech;
function VisitorPage(props) {
  const [obj, setState] = useState({
    imageName: "",
    imageDescription: "",
    imageSrc: ""
  });

  const speakText = (text) => {
    speech.speak({
      text: text
    });
  };

  // BE validation hook
  useEffect(() => {
    speech = new Speech();
    console.log(speech);
    fetch(contentEndpoint.VISITOR_PAGE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ qrCodeId: props.match.params.qrCodeId })
    })
      .then((res) => {
        if (res.ok || res.status === 401) {
          return res.json();
        }
        throw new Error();
      })
      .then((res) => {
        setState({
          ...obj,
          imageName: res.imageName,
          imageDescription: res.imageDescription,
          imageSrc: res.imageSrc
        });
      })

      .catch((_) => {});
  }, []);
  return (
    <div>
      <h4 className="text-center">Visitor page (preview mode)</h4>
      <button onClick={() => speakText(obj.imageDescription)}>
        Read in english
      </button>
      <div id="client-content">
        <p>
          <span className="font-weight-bold">Image name: </span>
          {obj.imageName}
        </p>
        <p>
          <span className="font-weight-bold">Image description: </span>
          {obj.imageDescription}
        </p>
      </div>
      <div className="row">
        <div className="col text-center">
          <img src={DOMAIN_NAME + obj.imageSrc} className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default VisitorPage;
