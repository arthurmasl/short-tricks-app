import axios from 'axios';
import { setUser } from '../slices/interfaceSlice';
import { setItems } from '../slices/storeSlice';

export const likeItem = () => async (dispatch, getState) => {
  const state = getState();

  const id = state.store.item._id;

  const { data } = await axios.post('/item/like', {
    id,
  });

  dispatch(setUser(data.user));

  const newItems = state.store.items.map((item) =>
    item._id === data.item._id ? data.item : item
  );

  dispatch(setItems(newItems));
};
