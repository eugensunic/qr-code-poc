import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';
import { GlobalErrorContext } from '../../App';

import {
  isEmailValid,
  isEmpty,
  isPasswordLessThan5
} from '../../services/login.service';

function Login(history) {
  const errorContext = useContext(GlobalErrorContext);
  const [obj, setCredential] = useState({
    username: '',
    password: '',
    passwordError: null,
    usernameError: null,
    submitRequest: false,
    loginSuccess: false
  });

  // successful login hook
  useEffect(() => {
    if (!obj.loginSuccess) return;
    localStorage.setItem('user', 'exists');
    history.push('/profile');
  }, [obj.loginSuccess, history]);

  // BE validation hook
  useEffect(() => {
    if (!obj.submitRequest) return;
    // setting timeout for loading spinner
    setTimeout(
      _ =>
        fetch('/database/users.json')
          .then(res =>
            validCredentials(res)
              ? setCredential({
                  ...obj,
                  passwordError: '',
                  loginSuccess: true,
                  submitRequest: false
                })
              : setCredential({
                  ...obj,
                  passwordError: 'Wrong credentials, Try again',
                  submitRequest: false
                })
          )
          .catch(_ =>
            errorContext.dispatchError({
              type: 'global',
              payload: 'Error ocurred, Could not fetch user'
            })
          ),
      1000
    );
  }, [obj.submitRequest]);

  const isFrontendValid = (username, password) => {
    return isEmailValid(username) && !isPasswordLessThan5(password);
  };

  const validCredentials = res => {
    return res.users.some(
      x => obj.username === x.userName && obj.password === x.password
    );
  };

  const validateUser = (username, password) => {
    // FE validation
    let usernameErr = '';
    let passwordErr = '';

    if (!isFrontendValid(username, password)) {
      if (isEmpty(username)) {
        usernameErr = 'Please provide username';
      } else if (!isEmailValid(username)) {
        usernameErr = 'Please provide valid username/mail';
      }
      if (isEmpty(password)) {
        passwordErr = 'Please provide password';
      } else if (isPasswordLessThan5(password)) {
        passwordErr = 'Password too short';
      }
      setCredential({
        ...obj,
        usernameError: usernameErr,
        passwordError: passwordErr
      });
      return;
    }
    // triggers BE validation hook
    setCredential({
      ...obj,
      submitRequest: true
    });
  };
  return (
    <div className="container">
      <div
        className="card card-signin my-5 center"
        style={{ opacity: isLoggedIn() ? 0.4 : 1 }}
      >
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <div className="form-signin">
            <div className="form-label-group">
              <input
                type="email"
                id="username"
                className="form-control"
                placeholder="Username/mail"
                required
                onChange={e =>
                  setCredential({
                    ...obj,
                    username: e.target.value,
                    usernameError: ''
                  })
                }
              />
              <label htmlFor="inputEmail">Email address</label>
            </div>

            {obj.usernameError && (
              <div className="error-container">{obj.usernameError}</div>
            )}

            <div className="form-label-group">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                onChange={e =>
                  setCredential({
                    ...obj,
                    password: e.target.value,
                    passwordError: ''
                  })
                }
                required
              />
              <label htmlFor="inputPassword">Password</label>
            </div>
            {obj.passwordError && (
              <div className="error-container">{obj.passwordError}</div>
            )}
            {obj.submitRequest && <div className="loader"></div>}
            <button
              className="btn btn-lg btn-primary btn-block text-uppercase"
              disabled={isLoggedIn()}
              type="submit"
              onClick={() => validateUser(obj.username, obj.password)}
            >
              Log in
            </button>
            <hr className="my-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
