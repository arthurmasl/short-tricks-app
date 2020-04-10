import axios from 'axios';
import { setUser } from '../slices/interfaceSlice';

export const getUser = async (dispatch) => {
  axios.defaults.headers.token = localStorage.getItem('token');

  const { data } = await axios.get('/user');

  dispatch(setUser(data));

  console.log('get user', data);
};
