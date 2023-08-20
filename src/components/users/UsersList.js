import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import { getAllUsers, deleteUser } from '../../store/slices/usersSlice';
import './UsersList.css';

function UsersList() {
	const dispatch = useDispatch();

	const users = useSelector((state) => state.usersList.users);

	const { url } = useRouteMatch();

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	return (
		<ul className='users-container'>
			{users.map((user) => {
				return (
					<li key={user.id} className='item-container'>
						<Link to={`${url}/${user.id}`} className='nav-user'>
							<p className='user'>
								{user.name} {user.id}
							</p>
						</Link>
						<Link to={`${url}/add/${user.id}`}>
							<p>Edit</p>
						</Link>
						<p
							id='del'
							onClick={() => dispatch(deleteUser(user.id))}
						>
							Del
						</p>
					</li>
				);
			})}
		</ul>
	);
}

export default UsersList;
