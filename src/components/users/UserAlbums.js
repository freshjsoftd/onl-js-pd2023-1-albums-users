import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserAlbums } from '../../store/slices/albumsSlice'
import { Link, useParams } from 'react-router-dom';

function UserAlbums() {

  const dispatch = useDispatch();

  const albums = useSelector((state) => state.albumsList.albums);

  console.log(albums)

  const {id} = useParams()

  useEffect(() => {
    dispatch(getUserAlbums(id))
  }, [dispatch, id])


  return (
		<ul className='albums-container'>
			{albums.map(({ id, title }) => (
				<Link key={id} to={`album/${id}`}>
					<li className='album-item'>{title}</li>
				</Link>
			))}
		</ul>
  );
}

export default UserAlbums