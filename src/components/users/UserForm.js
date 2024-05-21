import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField } from '@mui/material';


import { createUser, updateUser } from '../../store/slices/usersSlice';
import { emptyUser } from '../../constants';
import './UserForm.css';

// const colors = ['red', 'green', 'black', 'blue',]

function UserForm() {
	const dispatch = useDispatch();

	const users = useSelector((state) => state.usersList.users);

	const { id } = useParams();

	const history = useHistory();
	console.log(history)

	const currentUser = users.find((user) => user.id === Number(id));

	/* const [editUser, setEditUser] = useState(
    currentUser ? currentUser : emptyUser
    ); */

	/* const onInputChange = (e) => {
    setEditUser({
      ...editUser, [e.target.name]: e.target.value
    })
  } */

	const goHome = () => history.goBack();

	const schema = Yup.object().shape({
		address: Yup.object().shape({
			city: Yup.string().required('City is required field'),
			street: Yup.string().required('Street is required field'),
		}),
		name: Yup.string()
			.min(3, 'Too less symbols')
			.max(15, 'Too many symbols')
			.required('Name is required field'),
		email: Yup.string()
			.email('No valid email')
			.required('Email is required field'),
	});

	const onFormSubmit = (values, actions) => {
		// console.log(values);
		// console.log(actions);
		// setTimeout(() => {actions.setSubmitting(false)}, 2000)
		!values.id
			? dispatch(createUser(values))
			: dispatch(updateUser(values));
	};

	const renderForm = ({isValid, handleReset}) => {
		// console.log(props)
		return (
			<Form id='users-form'>
				<div className='field-container'>
					<label>Name</label>
					<Field 
						as={TextField}
						id='name'
						type='text' 
						name='name' 
						sx={{ width: 500}}

						/>
				</div>
				<ErrorMessage name='name'>
					{(msg) => <div className='error'>{msg}</div>}
				</ErrorMessage>
				<fieldset
					id='contact'
					form='users-form'
					className='group-container'
				>
					<legend>Contact</legend>
					<div className='field-container'>
						<label htmlFor='email'>Email</label>
						<Field id='email' name='email' placeholder='Email' />
					</div>
					<ErrorMessage name='email'>
						{(msg) => <div className='error'>{msg}</div>}
					</ErrorMessage>
					{/* <Field
						as='select'
						name='email'
						placeholder='Email'
						multiple
					>
						{colors.map((color) => {
							return (
								<option key={color} value={color} multiple>
									{color}
								</option>
							);
						})}
					</Field> */}
					<div className='field-container'>
						<label htmlFor='phone'>Phone</label>
						<Field id='phone' name='phone' placeholder='Phone' />
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
						<Field
							id='city'
							name='address.city'
							placeholder='City'
						/>
					</div>
					<ErrorMessage name='address.city'>
						{(msg) => <div className='error'>{msg}</div>}
					</ErrorMessage>
					<div className='field-container'>
						<label htmlFor='street'>Street</label>
						<Field
							type='text'
							name='address.street'
							placeholder='Street'
						/>
					</div>
					<ErrorMessage name='address.street'>
						{(msg) => <div className='error'>{msg}</div>}
					</ErrorMessage>
					<div className='field-container'>
						<label htmlFor='zipcode'>Zipcode</label>
						<Field
							type='text'
							name='address.zipcode'
							placeholder='Zipcode'
						/>
					</div>
				</fieldset>
				<Stack direction='row' justifyContent='center' spacing={12}>
					<Button
						variant='contained'
						type='submit'
						disabled={!isValid}
						size='large'
						startIcon={<SaveIcon />}
					>
						Save
					</Button>
					<Button
						variant='contained'
						type='button'
						size='large'
						startIcon={<KeyboardReturnIcon />}
						onClick={goHome}
					>
						Return
					</Button>
					<Button
						variant='contained'
						type='reset'
						size='large'
						startIcon={<ClearIcon />}
						style={{ backgroundColor: 'teal' }}
					>
						Reset
					</Button>
				</Stack>
				{/* <div className='btn-group'>
					<button
						type='submit'
						className='save-btn'
						disabled={!isValid}
					>
						Save
					</button>
					<button
						type='button'
						className='cancel-btn'
						onClick={goHome}
					>
						Return
					</button>
					<button type='reset' onClick={handleReset}>
						Reset
					</button>
				</div> */}
			</Form>
		);
	};

	return (
		<Formik
			initialValues={currentUser ? currentUser : emptyUser}
			onSubmit={onFormSubmit}
			validationSchema={schema}
		>
			{renderForm}
		</Formik>
	);
}

export default UserForm;
