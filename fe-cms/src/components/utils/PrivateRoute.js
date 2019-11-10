import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }) => {
  const routeComponent = props =>
    localStorage.getItem('user') ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
