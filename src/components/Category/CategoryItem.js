import React from 'react';

import Play from '../Buttons/Play';
import { selectIsPlay, selectVideoId } from '../../slices/playerSlice';
import { useSelector } from 'react-redux';

const CategoryItem = ({ name, videos, index }) => {
  const isPlay = useSelector(selectIsPlay);
  const playerVideoId = useSelector(selectVideoId);

  const video = videos[0].url;
  const isDim = isPlay && playerVideoId !== video;

  return (
    <div className="category-item">
      <span className="number">{String('0' + index).slice(-2)}</span>
      <div className="text">
        <p className="label">{videos.length} videos</p>
        <p className="name">{name}</p>
      </div>
      <div>
        <Play medium to={name} videoId={video} dim={isDim} />
      </div>
    </div>
  );
};

export default CategoryItem;
