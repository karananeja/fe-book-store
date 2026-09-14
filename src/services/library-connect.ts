import { BookStatus } from '@/utils/types';
import { apiDelete, apiGet, apiPatch, apiPost } from './api-client';

export const getLibrary = (status?: BookStatus) => {
  const query = status ? `?status=${status}` : '';
  return apiGet(`/library${query}`);
};

export const addToLibrary = (body: { bookId: string; status?: BookStatus }) =>
  apiPost('/library', body);

export const updateLibraryItem = (id: string, status: BookStatus) =>
  apiPatch(`/library/${id}`, { status });

export const removeFromLibrary = (id: string) => apiDelete(`/library/${id}`);
