import React from 'react'
import {
	NavLink,
	useRouteMatch,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import UserForm from './UserForm'
import AlbumPhotos from '../albums/AlbumPhotos';
import UserAlbums from './UserAlbums';
import UsersList from './UsersList';

function Users() {

const {path, url} = useRouteMatch();
  return (
		<>
			<nav>
				<NavLink to={`${url}/add`} activeClassName='selected'>
					Add
				</NavLink>
			</nav>
			<hr />
			<Switch>
				<Route path={`${path}/add/:id`}>
					<div>
						<UserForm />
					</div>
				</Route>
				<Route path={`${path}/add`}>
					<Redirect to={`${url}/add/:id`}>
						<div>
							<UserForm />
						</div>
					</Redirect>
				</Route>
				<Route path={`${path}/album/:id`}>
					<div>
						<AlbumPhotos />
					</div>
				</Route>
				<Route path={`${path}/:id`}>
					<div>
						<UserAlbums />
					</div>
				</Route>
				<Route path={`${path}`}>
					<div>
						<UsersList />
					</div>
				</Route>
			</Switch>
		</>
  );
}

export default Users