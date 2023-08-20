import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'

import { createUser, updateUser } from '../../store/slices/usersSlice'
import { emptyUser } from '../../constants';
import './UserForm.css'


function UserForm() {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.usersList.users);

  const {id} = useParams();

  const history = useHistory();

  const currentUser = users.find(user => user.id === Number(id));

  const [editUser, setEditUser] = useState(
    currentUser ? currentUser : emptyUser
    );


  const onInputChange = (e) => {
    setEditUser({
      ...editUser, [e.target.name]: e.target.value
    })
  }

  const goHome = () => history.goBack();

  const onReset = () => {
    setEditUser(emptyUser)
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    !editUser.id
      ? dispatch(createUser(editUser))
      : dispatch(updateUser(editUser));
  }

  return (
		<form id='users-form' onSubmit={onFormSubmit}>
			<div className='field-container'>
				<label>Name</label>
				<input
					type='text'
					name='name'
					value={editUser.name}
					onChange={onInputChange}
				/>
			</div>
			<fieldset
				id='contact'
				form='users-form'
				className='group-container'
			>
				<legend>Contact</legend>
				<div className='field-container'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						value={editUser.email}
						onChange={onInputChange}
						placeholder='Email'
					/>
				</div>
				<div className='field-container'>
					<label htmlFor='phone'>Phone</label>
					<input
						type='phone'
						name='phone'
						value={editUser.phone}
						onChange={onInputChange}
						placeholder='Phone'
					/>
				</div>
			</fieldset>
			<fieldset
				id='address'
				form='users-form'
				className='group-container'
			>
				<legend>Address</legend>
				<div className='field-container'>
					<label htmlFor='city'>City</label>
					<input
						type='city'
						name='city'
						value={editUser.address.city}
						onChange={onInputChange}
						placeholder='City'
					/>
				</div>
				<div className='field-container'>
					<label htmlFor='street'>Street</label>
					<input
						type='street'
						name='street'
						value={editUser.address.street}
						onChange={onInputChange}
						placeholder='Street'
					/>
				</div>
				<div className='field-container'>
					<label htmlFor='zipcode'>Zipcode</label>
					<input
						type='zipcode'
						name='zipcode'
						value={editUser.address.zipcode}
						onChange={onInputChange}
						placeholder='Zipcode'
					/>
				</div>
			</fieldset>
			<div className='btn-group'>
				<button type='submit' className='save-btn'>
					Save
				</button>
				<button type='button' className='cancel-btn' onClick={goHome}>
					Return
				</button>
				<button type='button' onClick={onReset}>
					Reset
				</button>
			</div>
		</form>
  );
}

export default UserForm
