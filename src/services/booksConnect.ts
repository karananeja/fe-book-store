import { apiDelete, apiGet, apiPost, apiPut } from './apiClient';

export const getBooks = () => apiGet('/books');

export const createBook = (body: string) => apiPost('/books', body);

export const getBook = () => apiGet('/books/:bookId');

export const updateBook = (body: string) => apiPut('/books/:bookId', body);

export const deleteBook = (body: string) => apiDelete('/books/:bookId', body);
