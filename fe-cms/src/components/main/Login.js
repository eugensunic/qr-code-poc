import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';
import { GlobalErrorContext } from '../../App';
import { userAccessEndpoint } from '../../config';

import {
  isEmailValid,
  isEmpty,
  isPasswordLessThan5
} from '../../services/login.service';

function Login(history) {
  const errorContext = useContext(GlobalErrorContext);
  const [obj, setCredential] = useState({
    email: null,
    password: null,
    passwordError: null,
    emailError: null,
    submitRequest: false,
    loginSuccess: false
  });

  // if logged in don't show the login page
  useEffect(() => {
    if (!isLoggedIn()) return;
    window.location.href = '/overview';
  }, [isLoggedIn()]);

  // successful login hook
  useEffect(() => {
    if (!obj.loginSuccess) return;
    window.location.href = '/create';
  }, [obj.loginSuccess]);

  // BE validation hook
  useEffect(() => {
    if (!obj.submitRequest) return;

    fetch(userAccessEndpoint.LOGIN, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: obj.email,
        password: obj.password
      })
    })
      .then(res => {
        if (res.ok || res.status === 401) {
          return res.json();
        }
        throw new Error();
      })
      .then(res => {
        return res.success
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
            });
      })

      .catch(_ => {
        setCredential({
          ...obj,
          submitRequest: false
        });
        errorContext.dispatchError({
          type: 'global',
          payload: 'Server error ocurred'
        });
      });
  }, [obj.submitRequest]);

  const isFrontendValid = (email, password) => {
    return isEmailValid(email) && !!password && !isPasswordLessThan5(password);
  };

  const validateUser = (email, password) => {
    // FE validation
    let emailErr = '';
    let passwordErr = '';

    if (!isFrontendValid(email, password)) {
      if (isEmpty(email)) {
        emailErr = 'Please provide email';
      } else if (!isEmailValid(email)) {
        emailErr = 'Please provide valid mail';
      }
      if (isEmpty(password)) {
        passwordErr = 'Please provide password';
      } else if (isPasswordLessThan5(password)) {
        passwordErr = 'Password too short';
      }

      setCredential({
        ...obj,
        emailError: emailErr,
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
                id="email"
                className="form-control"
                placeholder="Username/mail"
                required
                onChange={e =>
                  setCredential({
                    ...obj,
                    email: e.target.value,
                    emailError: ''
                  })
                }
              />
              <label htmlFor="inputEmail">Email address</label>
            </div>

            {obj.emailError && (
              <div className="error-container">{obj.emailError}</div>
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
              onClick={() => validateUser(obj.email, obj.password)}
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
