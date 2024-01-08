import { DefaultError, UseMutationOptions } from '@tanstack/react-query';

export type BackButtonPropsType = { destination?: string };

export type BookType = { title: string; author: string; publishYear: number };

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

export type BooksTablePropsType = { bookList?: GetBookInfoType[] };

export type BooksCardPropsType = BooksTablePropsType;

export type BookCardPropsType = { book: GetBookInfoType };

export type BookModalPropsType = BookCardPropsType & { onClose: () => void };
