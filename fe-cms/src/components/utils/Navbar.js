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
      <ul className="navbar-nav">
        <li className="">
          <Link to={'/overview'}> Overview</Link>
        </li>
        <li className="">
          <Link to={'/create'}> Create content</Link>
        </li>
        <li className="">
          <Link to={'/changepassword'}>Admin</Link>
        </li>
        <li className="">
          <Link to={'/about'}> About</Link>
        </li>
        <li>
          <Link className="logoutButton" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(Navbar);
