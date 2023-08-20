import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../api/data-service';
import { setStatus, setError } from '../../services/reducer-service';

const initialState = {
	photos: [],
	status: null,
	error: null,
};

const PHOTOS_SLICE_NAME = 'photos';

export const getAllPhotos = createAsyncThunk(
	`${PHOTOS_SLICE_NAME}/getAllPhotos`,
	initialState,
	async function (_, { rejectWithValue }) {
		try {
			const { data } = await api.get(`/photos`);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getAlbumPhotos = createAsyncThunk(
	`${PHOTOS_SLICE_NAME}/getAlbumPhotos`,
	async function (id, { rejectWithValue }) {
		try {
			const { data } = await api.get(`/photos?albumId=${id}`);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const photosSlice = createSlice({
	name: PHOTOS_SLICE_NAME,
	initialState,
	extraReducers: {
		[getAllPhotos.fulfilled]: (state, { payload }) => {
			state.photos = payload;
			state.status = 'fulfilled';
			state.error = null;
		},
		[getAlbumPhotos.fulfilled]: (state, { payload }) => {
			state.photos = payload;
			state.status = 'fulfilled';
			state.error = null;
		},

		[getAllPhotos.pending]: setStatus,
		[getAlbumPhotos.pending]: setStatus,

		[getAllPhotos.rejected]: setError,
		[getAlbumPhotos.rejected]: setError,
	},
});

export default photosSlice.reducer;
