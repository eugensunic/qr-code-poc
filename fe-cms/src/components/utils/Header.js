import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';
import Navbar from './Navbar';
function Header(route) {
	return <header>{isLoggedIn() && <Navbar />}</header>;
}

export default withRouter(Header);
