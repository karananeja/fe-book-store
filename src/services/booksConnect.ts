import { BookType } from '@/utils/types';
import { apiDelete, apiGet, apiPost, apiPut } from './apiClient';

export const getBooks = () => apiGet('/books');

export const createBook = (body: BookType) => apiPost('/books', body);

export const getBook = (bookId: string) => apiGet(`/books/${bookId}`);

export const updateBook = (body: BookType) => apiPut('/books/:bookId', body);

export const deleteBook = () => apiDelete('/books/:bookId');
