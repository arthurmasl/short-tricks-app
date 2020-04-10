import { setCategories } from '../slices/storeSlice';
import axios from 'axios';

export const getCategories = async (dispatch, getState) => {
  const state = getState();

  if (!state.store.categories.length) {
    const response = await axios(`/categories`);
    const data = await response.data;

    dispatch(setCategories(data));

    console.log('get categories:', data);
  }
};
