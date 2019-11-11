import React, { useState, useEffect, useContext, useReducer } from 'react';
import Footer from './components/utils/Footer';
import Navbar from './components/utils/Navbar';
import PrivateRoute from './components/utils/PrivateRoute';
import Register from './components/main/Register';
import Login from './components/main/Login';
import NoMatch from './components/utils/NoMatch';
import ErrorContainer from './components/utils/ErrorContainer';

import CreateContent from './components/main/CreateContent';
import OverviewContent from './components/main/OverviewContent';
import About from './components/main/About';

import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers';

// global error reducer
const reducer = (state = { message: '' }, action) => {
  switch (action.type) {
    case 'global':
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};
export const GlobalErrorContext = React.createContext({});

function App() {

  const [error, dispatch] = useReducer(reducer, { message: '' });
  console.log(error)
  return (
    <GlobalErrorContext.Provider value={{ dispatchError: dispatch }}>
      <Router history={history}>
        <Navbar />
        <ErrorContainer message={error.message} />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/create" component={CreateContent} />
          <PrivateRoute path="/overview" component={OverviewContent} />
          <Route path="/about" component={About} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
      <Footer />
    </GlobalErrorContext.Provider>
  );
}

export default App;
