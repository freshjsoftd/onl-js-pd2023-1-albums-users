import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from '../../api/data-service';
import { setError, setStatus } from '../../services/reducer-service';

const SLICE_NAME = 'users';

const initialState = {
  users: [],
  status: null,
  error: null,
}



export const getAllUsers = createAsyncThunk(
  `SLICE_NAME/getAllUsers`,
  async function(_, {rejectWithValue}){
    try {
      const {data} = await api.get(`/${SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const createUser = createAsyncThunk(
	`SLICE_NAME/createUser`,
	async function (newUser, { rejectWithValue }) {
		try {
			const { data } = await api.post(`/${SLICE_NAME}`, newUser);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const updateUser = createAsyncThunk(
	`SLICE_NAME/updateUser`,
	async function (changedUser, { rejectWithValue }) {
		try {
			const { data } = await api.put(`/${SLICE_NAME}/${changedUser.id}`, changedUser);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const usersSlice = createSlice({
	name: `${SLICE_NAME}`,
	initialState,
	extraReducers: {
		[getAllUsers.fulfilled]: (state, { payload }) => {
			state.users = payload;
			state.status = 'fulfilled';
			state.error = null;
		},
		[createUser.fulfilled]: (state, { payload }) => {
			state.users.push(payload);
			state.status = 'fulfilled';
			state.error = null;
		},
		[updateUser.fulfilled]: (state, { payload }) => {
			state.users = state.users.map(user => user.id === payload.id 
            ? payload
            : user)
			state.status = 'fulfilled';
			state.error = null;
		},

		[getAllUsers.pending]: setStatus,
		[createUser.pending]: setStatus,
		[updateUser.pending]: setStatus,

		[getAllUsers.rejected]: setError,
		[createUser.rejected]: setError,
		[updateUser.rejected]: setError,
	},
});


export default usersSlice.reducer;