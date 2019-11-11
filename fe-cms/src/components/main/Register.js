import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { isLoggedIn, getCurrentDateTimeString } from '../../helpers';
import { GlobalErrorContext } from '../../App';

import {
  isEmailValid,
  isEmpty,
  isPasswordLessThan5,
  passwordsMatch
} from '../../services/login.service';

function Register() {
  const errorContext = useContext(GlobalErrorContext);
  const [obj, setCredential] = useState({
    email: null,
    password: null,
    repeatPassword: null,
    firstName: null,
    lastName: null,
    firstNameError: null,
    lastNameError: null,
    passwordError: null,
    emailError: null,
    submitRequest: false,
    registrationSuccess: false
  });

  const resetState = () => {
    setCredential({
      ...obj,
      password: null,
      repeatPassword: null,
      firstName: null,
      lastName: null,
      firstNameError: null,
      lastNameError: null,
      passwordError: null,
      emailError: null,
      submitRequest: false
    });
  };

  useEffect(() => {
    if (!obj.registrationSuccess) return;
    resetState();
  }, [obj.registrationSuccess]);

  // BE validation hook
  useEffect(() => {
    if (!obj.submitRequest) return;
    fetch('/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        password: obj.password,
        registrationTime: getCurrentDateTimeString()
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.hasOwnProperty('isAlreadyRegistered')) {
          setCredential({
            ...obj,
            passwordError: 'User with given mail already exists',
            submitRequest: false
          });
          return;
        }
        setCredential({
          ...obj,
          passwordError: '',
          submitRequest: false,
          registrationSuccess: true
        });
      })

      .catch(_ => {
        setCredential({
          ...obj,
          submitRequest: false
        });
        errorContext.dispatchError({
          type: 'global',
          payload: 'Server error ocurred 1'
        });
      });
  }, [obj.submitRequest]);

  const isFrontendValid = () => {
    return (
      isEmailValid(obj.email) &&
      !isEmpty(obj.firstName) &&
      !isEmpty(obj.lastName) &&
      passwordsMatch(obj.password, obj.repeatPassword)
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
      if (isEmpty(obj.email)) {
        emailErr = 'Please provide an email address';
      } else if (!isEmailValid(obj.email)) {
        emailErr = 'Please provide valid mail address';
      }
      if (isEmpty(obj.password)) {
        passwordErr = 'Please provide a password';
      } else if (isPasswordLessThan5(obj.password)) {
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
      <div className="card card-signin my-5 center">
        <div className="card-body">
          <h5 className="card-title text-center">Register</h5>
          {obj.registrationSuccess && (
            <h4 className="success-container">Successful registration!</h4>
          )}
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
              disabled={obj.submitRequest}
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
