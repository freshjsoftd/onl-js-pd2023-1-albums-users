import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAlbumPhotos } from '../../store/slices/photosSlice';



function AlbumPhotos() {

  const dispatch = useDispatch();

  const photos = useSelector((state) => state.photosList.photos);

  const {id} = useParams()

  useEffect(() => {
		dispatch(getAlbumPhotos(id));
  }, [dispatch, id]);
  return (
    <div>
      {photos.map(({title, id, thumbnailUrl}) => (
        <p key={id}>
          {title}
          <img
            src={thumbnailUrl}
            alt={title}
            width='200px'
           />
        </p>
      ))}
    </div>
  )
}

export default AlbumPhotos