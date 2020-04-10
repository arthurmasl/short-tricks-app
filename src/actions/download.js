import axios from 'axios';

export const downloadRequest = async url => {
  const response = await axios.post('/download', { url });
  const { id } = await response.data;

  return { id };
};
