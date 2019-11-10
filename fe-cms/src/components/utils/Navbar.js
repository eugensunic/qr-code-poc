import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Navbar(history) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
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
          <li className="nav-item active">
            <Link to={'/register'}> Register</Link>
          </li>
          <li className="nav-item">
            <Link to={'/login'}> Login</Link>
          </li>
          <li className="nav-item">
            <Link to={'/create'}> Create new content</Link>
          </li>
          <li className="nav-item">
            <Link to={'/edit'}> Edit existing content</Link>
          </li>
          <li className="nav-item">
            <Link to={'/about'}> About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
