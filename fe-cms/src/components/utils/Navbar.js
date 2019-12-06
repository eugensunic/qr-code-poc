import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';

function Navbar(route) {
  const logout = () => {
    fetch('/logout', {
      method: 'POST'
    }).then(_ => route.history.push('/'));
  };

  return (
    <nav className="hero-nav">
      <ul className="hero-nav-ul">
        <li>
          <Link to={'/overview'}> Overview</Link>
        </li>
        <li>
          <Link to={'/create'}> Create content</Link>
        </li>
        <li className="dropdownList">
          <Link to={'/changepassword'}>Admin</Link>
        </li>
        <li>
          <Link to={'/about'}> About</Link>
        </li>
        <li>
          <button className="logoutButton" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(Navbar);
