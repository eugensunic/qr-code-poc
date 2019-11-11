import React from 'react';

function ErrorContainer(obj) {
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
