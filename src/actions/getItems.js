import { setItems, setItem, setCategory } from '../slices/storeSlice';
import { setVideoId } from '../slices/playerSlice';
import axios from 'axios';

export const getItems = (params) => async (dispatch, getStore) => {
  const { store } = getStore();

  const { category, item } = params;

  if (store.category.name !== category) {
    const response = await axios(`/items/${category}`);
    const data = await response.data;

    dispatch(setItems(data.items));
    dispatch(setCategory(data.category));

    if (item) {
      const singleItem = data.items.find((i) => i.name === item);
      if (singleItem) {
        dispatch(setItem(singleItem));
        dispatch(setVideoId(singleItem.videos[0].url));
      }
    }

    console.log('get items:', data);
  }
};
