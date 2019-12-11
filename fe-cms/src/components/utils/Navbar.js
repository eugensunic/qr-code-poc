import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';

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
      <Link className="hamburger" onClick={() => setToggleHeader(!toggleHeader)}>
        <i className="fa fa-bars"></i>
      </Link>
      <ul className="hero-nav-ul">
        <li>
          <Link to={'/overview'}> Overview</Link>
        </li>
        <li>
          <Link to={'/create'}>New content</Link>
        </li>
        <li className="dropdownList">
          <Link to={'/changepassword'}>Admin</Link>
        </li>
        <li>
          <Link to={'/about'}> About</Link>
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
