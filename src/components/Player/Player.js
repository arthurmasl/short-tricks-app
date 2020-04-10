import React, { useRef, useEffect } from 'react';
import './Player.style.scss';
import {
  setDuration,
  setCurrentTime,
  selectRange,
  selectVideoId,
  selectIsPlay,
  selectNewTime,
  setRange,
  selectPlaybackRate,
} from '../../slices/playerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { fullVideosUrl, trimmedVideosUrl } from '../../utils/api';

const Player = ({ editor }) => {
  const player = useRef();
  const dispatch = useDispatch();

  const { start, end } = useSelector(selectRange);
  const newTime = useSelector(selectNewTime);
  const videoId = useSelector(selectVideoId);
  const isPlay = useSelector(selectIsPlay);
  const playbackRate = useSelector(selectPlaybackRate);

  const url = editor ? fullVideosUrl : trimmedVideosUrl;
  const ext = editor ? 'webm' : 'mp4';

  useEffect(() => {
    return () => {
      dispatch(setRange({ start: 0, end: 0 }));
    };
  }, [dispatch]);

  useEffect(() => {
    if (videoId) {
      player.current.src = `${url}/${videoId}.${ext}`;
    }
  }, [ext, url, videoId]);

  useEffect(() => {
    player.current.currentTime = start;
  }, [start]);

  useEffect(() => {
    player.current.currentTime = end - 0.01;
  }, [end]);

  useEffect(() => {
    player.current.currentTime = newTime;
  }, [newTime]);

  useEffect(() => {
    player.current.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    isPlay ? player.current.play() : player.current.pause();
  }, [isPlay]);

  const loadedHandler = () => {
    dispatch(setDuration(player.current.duration));
    dispatch(
      setRange({
        start: player.current.duration / 2,
        end: player.current.duration / 2 + 5,
      })
    );
    if (isPlay) {
      player.current.play();
    }
  };

  const timeUpdateHandler = () => {
    if (editor) {
      if (player.current.currentTime >= end) {
        player.current.currentTime = start;
      }
    } else {
      dispatch(setCurrentTime(player.current.currentTime));
    }
  };

  return (
    <div className="player">
      <video
        muted
        ref={player}
        onLoadedData={loadedHandler}
        onTimeUpdate={timeUpdateHandler}
        loop={!editor}
      />
    </div>
  );
};

export default Player;
