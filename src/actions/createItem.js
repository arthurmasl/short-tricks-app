import axios from 'axios';
import {
  setCategory,
  setCategories,
  setCreateLoading,
  setItem,
} from '../slices/storeSlice';
import { history } from '../index';
import { setVideoId } from '../slices/playerSlice';
import { setFilter } from '../slices/interfaceSlice';

export const createItem = async (dispatch, getState) => {
  const state = getState();

  const { videoId } = state.player;
  const { start, end } = state.player.range;
  const { originalVideo, name, category } = state.creator.form;

  dispatch(setCreateLoading(true));

  const response = await axios.post('/create', {
    videoId,
    start,
    end,
    originalVideo,
    category,
    name,
  });

  const data = await response.data;

  dispatch(setCategories([]));
  dispatch(setCategory({}));
  dispatch(setItem(data));
  dispatch(setVideoId(data.videos[0].url));

  dispatch(setFilter(0));

  history.push(`/${category}/${name}`);

  dispatch(setCreateLoading(false));

  console.log('get item:', data);
};
