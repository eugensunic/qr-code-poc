import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ROUTES } from '../../navigation';
import { userAccessEndpoint } from '../../config';
import { useTranslation } from 'react-i18next';

function Navbar(route) {
  const [toggleHeader, setToggleHeader] = useState(false);
  const { t } = useTranslation();

  const logout = () => {
    fetch(userAccessEndpoint.LOGOUT, {
      method: 'POST'
    }).then(_ => route.history.push(ROUTES.HOME));
  };

  return (
    <nav className={`hero-nav ${!toggleHeader && 'hidden-header'}`}>
      <Button className="hamburger" onClick={_ => setToggleHeader(!toggleHeader)}>
        <i className="fa fa-bars"></i>
      </Button>
      <ul className="hero-nav-ul" onClick={_ => setToggleHeader(!toggleHeader)}>
        <li>
          <Link to={ROUTES.OVERVIEW}>{t('Overview')}</Link>
        </li>
        <li>
          <Link to={ROUTES.CREATE}>{t('New content')}</Link>
        </li>
        <li className="dropdownList">
          <Link to={ROUTES.ADMIN}>{t('Admin')}</Link>
        </li>
        <li>
          <Link to={ROUTES.ABOUT}>{t('About')}</Link>
        </li>
        <li className="logoutLi">
          <button className="logoutButton" onClick={logout}>
            {t('Logout')}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(Navbar);
