import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from '@/services/booksConnect';
import { GetBookType, GetBooksType, MutationOptionsType } from '@/utils/types';
import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';

export const useGetBooks = () => {
  return useQuery<GetBooksType>({
    queryKey: ['get-books'],
    queryFn: getBooks,
  });
};

export const useGetBook = (
  bookId: string,
  options: Partial<UseQueryOptions<GetBookType>>
) => {
  return useQuery({
    queryKey: ['get-book', bookId],
    queryFn: () => getBook(bookId),
    ...options,
  });
};

export const useCreateBook = (options?: MutationOptionsType) => {
  return useMutation({ mutationFn: createBook, ...options });
};

export const useUpdateBook = (
  bookId: string,
  options?: MutationOptionsType
) => {
  return useMutation({
    mutationFn: (body) => updateBook(body, bookId),
    ...options,
  });
};

export const useDeleteBook = (
  bookId: string,
  options?: MutationOptionsType
) => {
  return useMutation({ mutationFn: () => deleteBook(bookId), ...options });
};
