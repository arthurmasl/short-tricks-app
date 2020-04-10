import React from 'react';
import Play from '../Buttons/Play';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectVideoId,
  selectPlaybackRate,
  setPlaybackRate,
} from '../../slices/playerSlice';
import VideoSlider from '../Slider/VideoSlider';

const FooterPlayer = () => {
  const dispatch = useDispatch();
  const videoId = useSelector(selectVideoId);
  const playbackRate = useSelector(selectPlaybackRate);

  const playbackRateUp = () => {
    if (playbackRate < 2) {
      const newPlaybackRate = Number(+playbackRate + 0.1).toFixed(1);

      dispatch(setPlaybackRate(newPlaybackRate));
    }
  };

  const playbackRateDown = () => {
    if (playbackRate > 0.1) {
      const newPlaybackRate = Number(+playbackRate - 0.1).toFixed(1);

      dispatch(setPlaybackRate(newPlaybackRate));
    }
  };

  return (
    <footer className="footer footer-player">
      <Play videoId={videoId} />
      <VideoSlider />
      <div className="playback-rate">
        <div className="buttons">
          <button onClick={playbackRateUp}>+</button>
          <button onClick={playbackRateDown}>-</button>
        </div>

        <div>{playbackRate}</div>
      </div>
    </footer>
  );
};

export default FooterPlayer;
