import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';

function Navbar(route) {
	const logout = () => {
		fetch('/logout', { method: 'POST' }).then((_) =>
			route.history.push('/')
		);
	};

	return (
		<div className='container'>
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<button
					type='button'
					className='navbar-toggler'
					data-toggle='collapse'
					data-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<Link to={'/overview'}> Overview</Link>
						</li>
						<li className='nav-item'>
							<Link to={'/changepassword'}> Change password</Link>
						</li>
						<li className='nav-item'>
							<Link to={'/create'}> Create content</Link>
						</li>

						<li className='nav-item'>
							<Link to={'/about'}> About</Link>
						</li>
					</ul>
				</div>
				{isLoggedIn() && (
					<button
						type='button'
						className='btn btn-danger'
						onClick={logout}>
						Logout
					</button>
				)}
			</nav>
		</div>
	);
}

export default withRouter(Navbar);
