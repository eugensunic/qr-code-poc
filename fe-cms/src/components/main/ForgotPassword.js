import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { isEmailValid, isEmpty } from '../../services/login.service';
import { GlobalErrorContext } from '../../App';

function ForgotPassword() {
  const errorContext = useContext(GlobalErrorContext);
  const [obj, setCredential] = useState({
    email: null,
    emailError: null,
    submitRequest: false,
    forgotPasswordSuccess: false
  });

  const isFrontendValid = () => {
    return !!isEmailValid(obj.email);
  };

  const onSubmitHandler = () => {
    // FE validation
    let emailErr = '';

    if (!isFrontendValid()) {
      if (isEmpty(obj.email)) {
        emailErr = 'Please provide email';
      } else if (!isEmailValid(obj.email)) {
        emailErr = 'Please provide valid mail';
      }

      setCredential({
        ...obj,
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
  // successful forgot password submit hook
  useEffect(() => {}, [obj.forgotPasswordSuccess]);

  // BE validation hook
  useEffect(() => {
    if (!obj.submitRequest) return;

    fetch('/forgot-password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: obj.email
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
              submitRequest: false
            })
          : setCredential({
              ...obj,
              submitRequest: false,
              emailError: `email doesn't exist in the database`
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

  return (
    <div className="container">
      <div className="card card-signin my-5 center">
        <div className="card-body">
          <h5 className="card-title text-center">Forgot Password</h5>
          <div className="form-signin">
            <div className="form-label-group">
              <input
                type="email"
                className="form-control"
                placeholder="mail"
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
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block text-uppercase"
              disabled={obj.submitRequest}
              onClick={() => onSubmitHandler()}
            >
              Send Password to email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ForgotPassword);
