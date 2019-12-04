import React from 'react';
import { withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';
import Navbar from './Navbar';
function Header() {
  return <header className="bg-dark">{isLoggedIn() && <Navbar />}</header>;
}

export default withRouter(Header);
