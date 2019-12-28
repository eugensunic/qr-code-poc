import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalErrorContext } from '../../App';
import { parseCookie, parseJwt } from '../../helpers';
import { userAccessEndpoint } from '../../config';
import { handleEnterKeyPress } from '../../helpers';
import { ROUTES } from '../../navigation';
import { useTranslation } from 'react-i18next';

import { isEmpty, isPasswordLessThan5, passwordsMatch } from '../../services/login.service';

function ChangePassword({ history }) {
  const { t } = useTranslation();
  const errorContext = useContext(GlobalErrorContext);
  
  const [obj, setCredential] = useState({
    currentPassword: '',
    userId: null,
    currentPasswordError: '',
    newPassword: '',
    repeatPassword: '',
    changePasswordError: '',
    submitRequest: false,
    changePasswordSuccess: false
  });

  useEffect(() => {
    const resetState = () => {
      setCredential({
        ...obj,
        currentPassword: '',
        currentPasswordError: '',
        newPassword: '',
        repeatPassword: '',
        changePasswordError: '',
        submitRequest: false
      });
    };
    if (!obj.changePasswordSuccess) return;
    resetState();
    history.push(ROUTES.LOGIN);
  }, [history, obj, obj.changePasswordSuccess]);

  // BE validation hook
  useEffect(() => {
    if (!obj.submitRequest) return;
    fetch(userAccessEndpoint.CHANGE_PASSWORD, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentPassword: obj.currentPassword,
        newPassword: obj.newPassword,
        id: parseJwt(parseCookie('token')).id
      })
    })
      .then(res => {
        if (res.ok || res.status === 401) {
          return res.json();
        }
        throw new Error();
      })
      .then(res => {
        res.success
          ? setCredential({
              ...obj,
              changePasswordError: '',
              currentPassword: '',
              newPassword: '',
              repeatPassword: '',
              submitRequest: false,
              changePasswordSuccess: true
            })
          : setCredential({
              ...obj,
              changePasswordError: t('Your current password is wrong, try again'),
              submitRequest: false,
              changePasswordSuccess: false
            });
      })

      .catch(_ => {
        setCredential({
          ...obj,
          submitRequest: false
        });
        errorContext.dispatchError({
          type: 'global',
          payload: t('Server error ocurred')
        });
      });
  }, [obj, obj.submitRequest, errorContext]);

  const isFrontendValid = () => {
    return (
      !isEmpty(obj.currentPassword) &&
      !isEmpty(obj.newPassword) &&
      passwordsMatch(obj.newPassword, obj.repeatPassword)
    );
  };

  const validateUser = () => {
    // FE validation
    let currentPasswordErr = '';
    let changePasswordErr = '';

    if (!isFrontendValid()) {
      if (isEmpty(obj.currentPassword)) {
        currentPasswordErr = t('Please provide a password');
      } else if (isPasswordLessThan5(obj.currentPassword)) {
        currentPasswordErr = t('Password too short');
      }
      if (isEmpty(obj.newPassword || obj.repeatPassword)) {
        changePasswordErr = t('Please provide a password');
      } else if (isPasswordLessThan5(obj.newPassword || obj.repeatPassword)) {
        changePasswordErr = t('Password too short');
      } else if (!passwordsMatch(obj.newPassword, obj.repeatPassword)) {
        changePasswordErr = t('Passwords do not match');
      }

      setCredential({
        ...obj,
        currentPasswordError: currentPasswordErr,
        changePasswordError: changePasswordErr
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
        style={{ opacity: obj.changePasswordSuccess ? 0.4 : 1 }}
      >
        <div className="card-body">
          <h5 className="card-title text-center">{t('Change password')}</h5>
          {obj.changePasswordSuccess && (
            <h4 className="success-container">{t('Successful change')}</h4>
          )}
          <div className="form-signin">
            <div className="form-label-group">
              <label htmlFor="inputPassword">{t('Current password')}</label>
              <input
                type="password"
                placeholder="Password"
                value={obj.currentPassword}
                className="form-control"
                onKeyPress={e => handleEnterKeyPress(() => validateUser(), e.which)}
                onChange={e =>
                  setCredential({
                    ...obj,
                    currentPassword: e.target.value,
                    currentPasswordError: null,
                    changePasswordSuccess: false
                  })
                }
                required
              />
            </div>
            {obj.currentPasswordError && (
              <div className="error-container">{obj.currentPasswordError}</div>
            )}
            <div id="change-password-container">
              <div className="form-label-group">
                <label htmlFor="inputPassword">{t('New password')}</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={obj.newPassword}
                  className="form-control"
                  onKeyPress={e => handleEnterKeyPress(() => validateUser(), e.which)}
                  onChange={e =>
                    setCredential({
                      ...obj,
                      newPassword: e.target.value,
                      passwordError: null,
                      changePasswordSuccess: false
                    })
                  }
                  required
                />
              </div>
              <div className="form-label-group">
                <label htmlFor="inputPassword">{t('Repeat password')}</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={obj.repeatPassword}
                  className="form-control"
                  onKeyPress={e => handleEnterKeyPress(() => validateUser(), e.which)}
                  onChange={e =>
                    setCredential({
                      ...obj,
                      repeatPassword: e.target.value,
                      changePasswordError: null,
                      changePasswordSuccess: false
                    })
                  }
                  required
                />
              </div>
              {obj.changePasswordError && (
                <div className="error-container">{obj.changePasswordError}</div>
              )}
            </div>

            {obj.submitRequest && <div className="loader"></div>}
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block text-uppercase adminBtn"
              disabled={obj.submitRequest}
              onClick={() => validateUser()}
            >
              {t('Confirm change')}
            </button>
            <hr className="my-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ChangePassword);
