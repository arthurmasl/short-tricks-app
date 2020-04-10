import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    duration: 0,
    range: { start: 0, end: 0 },
    currentTime: 0,
    newTime: 0,
    videoId: 0,
    isPlay: false,
    playbackRate: 1,
  },
  reducers: {
    setVideoId(state, action) {
      state.videoId = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setRange(state, action) {
      const { start, end } = action.payload;
      state.range = { start, end };
    },
    setPlay(state, action) {
      if (action.payload !== undefined) {
        state.isPlay = action.payload;
      } else {
        state.isPlay = !state.isPlay;
      }
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    setNewTime(state, action) {
      state.newTime = action.payload;
    },
    setPlaybackRate(state, action) {
      state.playbackRate = action.payload;
    },
  },
});

export const selectVideoId = (state) => state.player.videoId;
export const selectDuration = (state) => state.player.duration;
export const selectRange = (state) => state.player.range;
export const selectIsPlay = (state) => state.player.isPlay;
export const selectCurrentTime = (state) => state.player.currentTime;
export const selectNewTime = (state) => state.player.newTime;
export const selectPlaybackRate = (state) => state.player.playbackRate;

export const {
  setRange,
  setDuration,
  setVideoId,
  setPlay,
  setCurrentTime,
  setNewTime,
  setPlaybackRate,
} = playerSlice.actions;
export default playerSlice.reducer;
