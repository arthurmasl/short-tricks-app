import axios from 'axios';
import { setCategories, setItem } from '../slices/storeSlice';
import { history } from '../index';

export const deleteItem = ({ category, item }) => async (
  dispatch,
  getState
) => {
  const state = getState();

  const itemId = state.store.item._id;
  const categoryId = state.store.category._id;

  if (category) {
    await axios.delete(`/categories/${categoryId}`);
    dispatch(setCategories([]));
    history.push('/');
  }

  if (item) {
    await axios.delete(`/items/${itemId}`);
    dispatch(setCategories([]));
    dispatch(setItem({}));
    history.push('/');
  }
};
