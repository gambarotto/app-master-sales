import axios from 'axios';

export const facebookApi = axios.create({
  baseURL: 'https://graph.facebook.com/v7.0/',
});
