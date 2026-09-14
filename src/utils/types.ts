import { DefaultError, UseMutationOptions } from '@tanstack/react-query';

export type BackButtonPropsType = { destination?: string };

export type BookType = { title: string; author: string; publishYear: number };

export type UserRole = 'admin' | 'user';

export type BookStatus = 'want_to_read' | 'reading' | 'completed';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type MutationOptionsType<T> = UseMutationOptions<
  unknown,
  DefaultError,
  T,
  unknown
>;

export type GetBookInfoType = {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
  createdAt: string;
  updatedAt: string;
};

export type GetBooksType<T> = { msg: string; info: T };

export type LibraryItemType = {
  _id: string;
  userId: string;
  bookId: GetBookInfoType | string;
  status: BookStatus;
  createdAt: string;
  updatedAt: string;
};

export type BooksTablePropsType = {
  bookList?: GetBookInfoType[];
  libraryByBookId?: Record<string, LibraryItemType>;
  onAddToLibrary?: (bookId: string) => void;
  isAddingBookId?: string | null;
};

export type BooksCardPropsType = BooksTablePropsType;

export type BookCardPropsType = {
  book: GetBookInfoType;
  libraryItem?: LibraryItemType;
  onAddToLibrary?: (bookId: string) => void;
  isAdding?: boolean;
};

export type BookModalPropsType = {
  book: GetBookInfoType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const BOOK_STATUS_LABELS: Record<BookStatus, string> = {
  want_to_read: 'Want to read',
  reading: 'Reading',
  completed: 'Completed',
};

export const BOOK_STATUSES: BookStatus[] = [
  'want_to_read',
  'reading',
  'completed',
];
