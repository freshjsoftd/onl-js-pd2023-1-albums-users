import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';

import { getAlbums } from '../../store/slices/albumsSlice';
import './AlbumsList.css'

function AlbumsList() {

  const dispatch = useDispatch();

  const albums = useSelector((state) => state.albumsList.albums);

  const { url } = useRouteMatch();

  useEffect(() => {
		dispatch(getAlbums());
  }, [dispatch]);
  return (
		<ul className='albums-container'>
			{albums.map(({ id, title }) => (
				<li key={id} className='album-item'>
					<Link to={`${url}/${id}`}>{title}</Link>
				</li>
			))}
		</ul>
  );
}

export default AlbumsList