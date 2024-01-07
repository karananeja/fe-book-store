import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from '@/services/booksConnect';
import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

export const useGetBooks = () => {
  return useQuery({ queryKey: ['get-books'], queryFn: getBooks });
};

export const useGetBook = () => {
  return useQuery({ queryKey: ['get-book'], queryFn: getBook });
};

export const useCreateBook = (options: UseMutationOptions) => {
  return useMutation({ mutationFn: createBook, ...options });
};

export const useUpdateBook = (options: UseMutationOptions) => {
  return useMutation({ mutationFn: updateBook, ...options });
};

export const useDeleteBook = (options: UseMutationOptions) => {
  return useMutation({ mutationFn: deleteBook, ...options });
};
