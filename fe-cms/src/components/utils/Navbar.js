import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';

function Navbar(history) {
  const logout = () => {
    fetch('/logout', { method: 'POST' }).then(
      _ => (window.location.href = '/')
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/#">
        Navbar
      </a>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to={'/forgot-password'}> Forgot password</Link>
          </li>
          <li className="nav-item">
            <Link to={'/change-password'}> Change password</Link>
          </li>
          <Link to={'/register'}> Register</Link>
          <li className="nav-item">
            <Link to={'/login'}> Login</Link>
          </li>
          <li className="nav-item">
            <Link to={'/create'}> Create content</Link>
          </li>
          <li className="nav-item">
            <Link to={'/overview'}> Overview</Link>
          </li>

          <li className="nav-item">
            <Link to={'/about'}> About</Link>
          </li>
        </ul>
      </div>
      {isLoggedIn() && (
        <button type="button" className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default withRouter(Navbar);
