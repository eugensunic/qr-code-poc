import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isLoggedIn, handleEnterKeyPress } from '../../helpers';
import { GlobalErrorContext } from '../../App';
import { userAccessEndpoint } from '../../config';
import { ROUTES } from '../../navigation';

import { isEmailValid, isEmpty, isPasswordLessThan5 } from '../../services/login.service';

function Login({ history }) {
  const errorContext = useContext(GlobalErrorContext);
  const [obj, setCredential] = useState({
    email: '',
    password: '',
    passwordError: '',
    emailError: '',
    submitRequest: false,
    loginSuccess: false
  });

  const isUserLoggedIn = isLoggedIn();

  // if logged in don't show the login page
  useEffect(() => {
    if (!isUserLoggedIn) return;
    history.push('/overview');
  }, [isUserLoggedIn, history]);

  // successful login hook
  // react-hooks/exhaustive-deps
  useEffect(() => {
    if (!obj.loginSuccess) return;
    history.push('/overview');
  }, [obj.loginSuccess, history]);

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
  }, [obj, obj.submitRequest, errorContext]);

  const isFrontendValid = (email, password) => {
    return isEmailValid(email) && !!password && !isPasswordLessThan5(password);
  };

  const validateUser = () => {
    // FE validation
    let emailErr = '';
    let passwordErr = '';

    if (!isFrontendValid(obj.email, obj.password)) {
      if (isEmpty(obj.email)) {
        emailErr = 'Please provide email';
      } else if (!isEmailValid(obj.email)) {
        emailErr = 'Please provide valid mail';
      }
      if (isEmpty(obj.password)) {
        passwordErr = 'Please provide password';
      } else if (isPasswordLessThan5(obj.password)) {
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
    <div>
      <div
        className="userFromWrapper card card-signin my-5"
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
                placeholder="Enter mail"
                required
                onKeyPress={e => handleEnterKeyPress(() => validateUser(), e.which)}
                onChange={e =>
                  setCredential({
                    ...obj,
                    email: e.target.value,
                    emailError: ''
                  })
                }
              />
            </div>

            {obj.emailError && <div className="error-container">{obj.emailError}</div>}

            <div className="form-label-group">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                onKeyPress={e => handleEnterKeyPress(() => validateUser(), e.which)}
                onChange={e =>
                  setCredential({
                    ...obj,
                    password: e.target.value,
                    passwordError: ''
                  })
                }
                required
              />
            </div>
            {obj.passwordError && <div className="error-container">{obj.passwordError}</div>}
            {obj.submitRequest && <div className="loader"></div>}

            <button
              className="btn btn-lg btn-primary btn-block text-uppercase"
              disabled={isLoggedIn()}
              type="submit"
              onClick={() => validateUser()}
            >
              Log in
            </button>

            <Link className="userFormLink" to={ROUTES.FORGOT_PASSWORD}>
              Forgot password?
            </Link>

            <hr className="my-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
