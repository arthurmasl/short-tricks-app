import axios from 'axios';

export const isDev = process.env.NODE_ENV === 'development';

export const host = isDev
  ? 'http://localhost:9000'
  : 'https://tricks-api.herokuapp.com';

export const hostApi = isDev
  ? 'http://localhost:3000'
  : 'https://tricks-api.herokuapp.com';

export const apiUrl = `${host}/api`;
export const fullVideosUrl = `${host}/videos/full`;
export const trimmedVideosUrl = `${host}/videos/trimmed`;

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.token = localStorage.getItem('token') || '';
