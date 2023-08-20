import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger'

import usersReducer from './slices/usersSlice';
import albumsReducer from './slices/albumsSlice';
import photosReducer from './slices/photosSlice';


export default configureStore({
	reducer: {
		usersList: usersReducer,
		albumsList: albumsReducer,
		photosList: photosReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});