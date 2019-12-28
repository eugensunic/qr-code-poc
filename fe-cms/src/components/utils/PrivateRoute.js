import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../helpers/index';
import { ROUTES } from '../../navigation';

const PrivateRoute = ({ component, ...rest }) => {
  const routeComponent = props =>
    isLoggedIn() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: ROUTES.LOGIN }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
