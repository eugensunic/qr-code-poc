import React, { useState, useEffect, useContext } from 'react';
import { GlobalErrorContext } from '../../App';

let timeId = null;
function ErrorContainer(obj) {
  console.log('here');
  const errorContext = useContext(GlobalErrorContext);
  if (obj.message) {
    clearInterval(timeId);
    timeId = setTimeout(
      _ =>
        errorContext.dispatchError({
          type: 'global',
          payload: ''
        }),
      3000
    );
  }
  if (!obj.message) return <div></div>;
  return (
    <div
      className="error-container"
      style={{
        borderRadius: 0,
        margin: 0,
        top: 0,
        paddingTop: 10,
        paddingBottom: 10
      }}
    >
      {obj.message}
    </div>
  );
}

export default ErrorContainer;
