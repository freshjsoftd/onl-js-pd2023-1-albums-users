import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../api/data-service';
import { setError, setStatus } from '../../services/reducer-service';

const SLICE_NAME = 'albums';

const initialState = {
	albums: [],
	status: null,
	error: null,
};

export const getAlbums = createAsyncThunk(
	`${SLICE_NAME}/getAlbums`,
	async function (_, { rejectWithValue }) {
		try {
			const { data } = await api.get(`/${SLICE_NAME}`);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getUserAlbums = createAsyncThunk(
  `${SLICE_NAME}/getUserAlbums`,
  async function(id, { rejectWithValue }){
    try {
      console.log(id)
		const { data } = await api.get(`/${SLICE_NAME}?userId=${id}`);
		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
  }
)


const albumsSlice = createSlice({
	name: `${SLICE_NAME}`,
	initialState,
	reducers: {},
	extraReducers: {
		[getAlbums.fulfilled]: (state, { payload }) => {
			state.albums = payload;
			state.status = 'fulfilled';
			state.error = null;
		},
		[getUserAlbums.fulfilled]: (state, { payload }) => {
			state.albums = payload;
			state.status = 'fulfilled';
			state.error = null;
		},

		[getAlbums.pending]: setStatus,
		[getUserAlbums.pending]: setStatus,

		[getAlbums.rejected]: setError,
		[getUserAlbums.rejected]: setError,
	},
});

export default albumsSlice.reducer;
