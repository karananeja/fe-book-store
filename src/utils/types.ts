import { DefaultError, UseMutationOptions } from '@tanstack/react-query';

export type BackButtonPropsType = { destination?: string };

export type BookType = { title: string; author: string; publishYear: number };

export type MutationOptionsType = UseMutationOptions<
  unknown,
  DefaultError,
  BookType,
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

export type GetBooksType = { msg: string; info: GetBookInfoType[] };

export type GetBookType = { msg: string; info: GetBookInfoType };
