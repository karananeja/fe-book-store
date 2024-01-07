import { BookType } from '@/utils/types';
import axios from 'axios';

const bookStore = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

export const apiPost = async (url: string, body: BookType) => {
  return await bookStore
    .post(url, body)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const apiGet = async (url: string) => {
  return await bookStore
    .get(url)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const apiPut = async (url: string, body: BookType) => {
  return await bookStore
    .put(url, body)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const apiDelete = async (url: string) => {
  return await bookStore
    .delete(url)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};
