import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';
import { Button } from 'react-bootstrap';

function Navbar(route) {
  const [toggleHeader, setToggleHeader] = useState(false);
  const logout = () => {
    fetch('/logout', {
      method: 'POST'
    }).then(_ => route.history.push('/'));
  };
  // const[navclass,setNavclass] = "hero-nav";

  return (
    <nav className={`hero-nav ${!toggleHeader && 'hidden-header'}`}>
      <Button className="hamburger" onClick={() => setToggleHeader(!toggleHeader)}>
        <i className="fa fa-bars"></i>
      </Button>
      <ul className="hero-nav-ul">
        <li>
          <Link onClick={() => setToggleHeader(!toggleHeader)} to={'/overview'}>
            {' '}
            Overview
          </Link>
        </li>
        <li>
          <Link onClick={() => setToggleHeader(!toggleHeader)} to={'/create'}>
            New content
          </Link>
        </li>
        <li className="dropdownList">
          <Link onClick={() => setToggleHeader(!toggleHeader)} to={'/admin'}>
            Admin
          </Link>
        </li>
        <li>
          <Link onClick={() => setToggleHeader(!toggleHeader)} to={'/about'}>
            {' '}
            About
          </Link>
        </li>
        <li className="logoutLi">
          <button className="logoutButton" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(Navbar);
