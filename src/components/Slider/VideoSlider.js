import React, { useState, useEffect } from 'react';

import Slider from 'rc-slider';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPlay,
  setNewTime,
  selectCurrentTime,
  selectDuration,
  selectIsPlay,
} from '../../slices/playerSlice';

const VideoSlider = () => {
  const dispatch = useDispatch();
  const [localTime, setLocalTime] = useState();

  const currentTime = useSelector(selectCurrentTime);
  const duration = useSelector(selectDuration);
  const isPlaying = useSelector(selectIsPlay);

  const changeHandler = (value) => {
    if (isPlaying) {
      dispatch(setPlay(false));
    }

    setLocalTime(value);
    dispatch(setNewTime(value));
  };

  useEffect(() => {
    setLocalTime(currentTime);
  }, [currentTime, isPlaying]);

  return (
    <div className="slider">
      <Slider
        max={duration}
        step={0.1}
        onChange={changeHandler}
        value={isPlaying ? currentTime : localTime}
      />
    </div>
  );
};

export default VideoSlider;
