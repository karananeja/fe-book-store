import { BookType } from '@/utils/types';
import { apiDelete, apiGet, apiPost, apiPut } from './apiClient';

export const getBooks = () => apiGet('/books');

export const createBook = (body: BookType) => apiPost('/books', body);

export const getBook = (bookId: string) => apiGet(`/books/${bookId}`);

export const updateBook = (body: BookType, bookId: string) =>
  apiPut(`/books/${bookId}`, body);

export const deleteBook = (bookId: string) => apiDelete(`/books/${bookId}`);
