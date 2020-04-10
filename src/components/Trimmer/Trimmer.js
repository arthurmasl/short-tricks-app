import React from 'react';
import './Trimmer.style.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDuration,
  selectRange,
  setRange,
  setPlay,
  selectVideoId,
} from '../../slices/playerSlice';

import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../Slider/Slider.style.scss';
import Play from '../Buttons/Play';

const Trimmer = () => {
  const videoId = useSelector(selectVideoId);
  const dispatch = useDispatch();
  const duration = useSelector(selectDuration);
  const { start, end } = useSelector(selectRange);

  const rangeHandler = (e) => {
    // const duration = e[1] - e[0];

    // if (duration < 20) {
    dispatch(setRange({ start: e[0], end: e[1] }));
    // }
    dispatch(setPlay(false));
  };

  if (start > 0) {
    return (
      <div className="trimmer-wrapper">
        <Play videoId={videoId} />
        <Range
          step={0.1}
          max={duration}
          value={[start, end]}
          allowCross={false}
          pushable={2}
          onChange={rangeHandler}
        />
      </div>
    );
  }
  return '';
};

export default React.memo(Trimmer);
