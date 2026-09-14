import {
  addToLibrary,
  getLibrary,
  removeFromLibrary,
  updateLibraryItem,
} from '@/services/library-connect';
import {
  BookStatus,
  GetBooksType,
  LibraryItemType,
  MutationOptionsType,
} from '@/utils/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetLibrary = (status?: BookStatus | 'all') => {
  const filter = status && status !== 'all' ? status : undefined;
  return useQuery<GetBooksType<LibraryItemType[]>>({
    queryKey: ['get-library', filter ?? 'all'],
    queryFn: () => getLibrary(filter),
  });
};

export const useAddToLibrary = (
  options?: MutationOptionsType<{ bookId: string; status?: BookStatus }>
) => {
  return useMutation({ mutationFn: addToLibrary, ...options });
};

export const useUpdateLibraryItem = (
  options?: MutationOptionsType<{ id: string; status: BookStatus }>
) => {
  return useMutation({
    mutationFn: ({ id, status }) => updateLibraryItem(id, status),
    ...options,
  });
};

export const useRemoveFromLibrary = (options?: MutationOptionsType<string>) => {
  return useMutation({ mutationFn: removeFromLibrary, ...options });
};
