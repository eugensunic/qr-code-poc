import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';
import { GlobalErrorContext } from '../../App';

import {
  isEmailValid,
  isEmpty,
  isPasswordLessThan5,
  passwordsMatch
} from '../../services/login.service';

function Register(history) {
  const errorContext = useContext(GlobalErrorContext);
  const [obj, setCredential] = useState({
    email: '',
    password: '',
    repeatPassword: null,
    firstName: null,
    lastName: null,
    firstNameError: null,
    lastNameError: null,
    passwordError: null,
    emailError: null,
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

  const isFrontendValid = () => {
    return (
      isEmailValid(obj.email) &&
      !isEmpty(obj.firstName) &&
      !isEmpty(obj.lastName) &&
      passwordsMatch(obj.password, obj.repeatPassword)
    );
  };

  const validCredentials = res => {
    return res.users.some(
      x => obj.username === x.userName && obj.password === x.password
    );
  };

  const validateUser = () => {
    // FE validation
    let firstNameErr = '';
    let lastNameErr = '';
    let passwordErr = '';
    let emailErr = '';

    if (!isFrontendValid()) {
      if (isEmpty(obj.firstName)) {
        firstNameErr = 'Please provide first name';
      }
      if (isEmpty(obj.lastName)) {
        lastNameErr = 'Please provide last name';
      }
      if (!isEmailValid(obj.email)) {
        emailErr = 'Please provide valid mail address';
      }
      if (isPasswordLessThan5(obj.password)) {
        passwordErr = 'Password too short';
      } else if (!passwordsMatch(obj.password, obj.repeatPassword)) {
        passwordErr = 'Passwords do not match';
      }
      setCredential({
        ...obj,
        firstNameError: firstNameErr,
        lastNameError: lastNameErr,
        passwordError: passwordErr,
        emailError: emailErr
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
          <h5 className="card-title text-center">Register</h5>
          <div className="form-signin">
            <div className="form-label-group">
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Username/mail"
                required
                onChange={e =>
                  setCredential({
                    ...obj,
                    firstName: e.target.value,
                    firstNameError: null
                  })
                }
              />
              <label htmlFor="inputEmail">First name</label>
            </div>
            {obj.firstNameError && (
              <div className="error-container">{obj.firstNameError}</div>
            )}
            <div className="form-label-group">
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Username/mail"
                required
                onChange={e =>
                  setCredential({
                    ...obj,
                    lastName: e.target.value,
                    lastNameError: null
                  })
                }
              />
              <label htmlFor="inputEmail">Last name</label>
            </div>
            {obj.lastNameError && (
              <div className="error-container">{obj.lastNameError}</div>
            )}
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
                    email: e.target.value,
                    emailError: null
                  })
                }
              />
              <label htmlFor="inputEmail">Email address</label>
            </div>

            {obj.emailError && (
              <div className="error-container">{obj.emailError}</div>
            )}
            <div id="register-password-container">
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
                      passwordError: null
                    })
                  }
                  required
                />
                <label htmlFor="inputPassword">Password</label>
              </div>
              <div className="form-label-group">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={e =>
                    setCredential({
                      ...obj,
                      repeatPassword: e.target.value,
                      passwordError: null
                    })
                  }
                  required
                />
                <label htmlFor="inputPassword">Confirm password</label>
              </div>
              {obj.passwordError && (
                <div className="error-container">{obj.passwordError}</div>
              )}
            </div>

            {obj.submitRequest && <div className="loader"></div>}
            <button
              className="btn btn-lg btn-primary btn-block text-uppercase"
              disabled={isLoggedIn()}
              type="submit"
              onClick={() => validateUser()}
            >
              Confirm registration
            </button>
            <hr className="my-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Register);
