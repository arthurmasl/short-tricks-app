import React from 'react';
import './Play.style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
  setPlay,
  selectIsPlay,
  setVideoId,
  selectVideoId,
} from '../../slices/playerSlice';
import { setItem, selectItems } from '../../slices/storeSlice';

const Play = ({ to, videoId, medium, dim }) => {
  const playerVideoId = useSelector(selectVideoId);

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isPlay = useSelector(selectIsPlay) && playerVideoId === videoId;
  const items = useSelector(selectItems);

  const pauseCn = isPlay ? 'pause' : '';
  const sizeCn = medium ? 'medium' : '';
  const dimCn = dim ? 'dim' : '';

  const playHandler = () => {
    if (to) {
      if (params.item !== to) {
        history.push(`/${params.category}/${to}`);
        dispatch(setVideoId(videoId));
        dispatch(setItem(items.find((i) => i.name === to)));
      }

      if (videoId === playerVideoId) {
        dispatch(setPlay());
      } else {
        dispatch(setPlay(true));
      }
    } else {
      dispatch(setPlay());
    }
  };

  return (
    <button
      className={`play ${pauseCn} ${sizeCn} ${dimCn}`}
      onClick={playHandler}
    />
  );
};

export default Play;
