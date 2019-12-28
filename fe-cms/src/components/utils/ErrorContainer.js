import React, { useContext } from 'react';
import { GlobalErrorContext } from '../../App';

let timeId = null;

function ErrorContainer(obj) {
  const errorContext = useContext(GlobalErrorContext);
  if (!!obj.message) {
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
  return <div className="error-container global-error">{obj.message}</div>;
}

export default ErrorContainer;
