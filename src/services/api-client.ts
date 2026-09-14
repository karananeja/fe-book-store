import axios from 'axios';

const TOKEN_KEY = 'book_store_token';
const USER_KEY = 'book_store_user';

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setAuthStorage = (token: string, user: unknown) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const bookStore = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

bookStore.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiPost = async <T = unknown>(url: string, body?: T) => {
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

export const apiPut = async <T = unknown>(url: string, body?: T) => {
  return await bookStore
    .put(url, body)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const apiPatch = async <T = unknown>(url: string, body?: T) => {
  return await bookStore
    .patch(url, body)
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
