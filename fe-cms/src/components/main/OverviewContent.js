import React, { useState, useEffect, useContext } from 'react';

function OverviewContent() {
  const [content, setState] = useState({
    arr: [],
    itemId: null
  });

  const logText = () => {
    console.log('in Render:', content.arr);
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

  useEffect(() => {
    console.log(content);
    console.log('on component load');
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
      {logText()}
      {content.arr.map((arr, i) => (
        <div key={i} className="row">
          {arr.map((obj, j) => (
            <div key={j} className="col-sm-12 col-md-4 overview-item">
              <button
                type="button"
                className="btn btn-danger d-inline"
                onClick={() => deleteItem(obj.id)}
              >
                Delete
              </button>
              <button type="button" className="btn btn-warning d-inline ml-1">
                Edit
              </button>
              <div className="row">
                <div className="col-xs-12 col-sm-6 ">
                  <h5 className="text-wrapper">{obj.imageName}</h5>
                  <img width="170" src={obj.path} />
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
    </div>
  );
}

export default OverviewContent;
