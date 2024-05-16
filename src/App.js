import React from 'react';
import {
	BrowserRouter as Router,
	Link,
	NavLink,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import './App.css';
import Albums from './components/albums/Albums';
import Users from './components/users/Users';

function App() {
	return (
		<Router>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static'>
					<Toolbar>
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant='h6'
							component='div'
							sx={{ flexGrow: 1 }}
						>
							Albums Manager
						</Typography>
						<Button color='inherit'>Login</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<div className='header'>
				<ul>
					<li>
						<NavLink to='/albums' activeClassName='selected'>
							Albums
						</NavLink>
					</li>
					<li>
						<NavLink to='/users' activeClassName='selected'>
							Users
						</NavLink>
					</li>
					<li>
						<Link to='/'>Home</Link>
					</li>
				</ul>
			</div>
			<Switch>
				<Route path='/' exact>
					HOME
				</Route>
				<Route path='/albums'>
					<Albums />
				</Route>
				<Route path='/users' component={Users} />
				<Route path='*'>
					<Redirect to='/users' />
				</Route>
				{/* <Redirect from='*' to='/users' /> */}
				{/* <Redirect path='*' to='/users' /> */}
			</Switch>
		</Router>
	);
}

export default App;
