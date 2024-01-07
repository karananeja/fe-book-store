import { DefaultError, UseMutationOptions } from '@tanstack/react-query';

export type BackButtonPropsType = { destination?: string };

export type BookType = { title: string; author: string; publishYear: number };

export type MutationOptionsType = UseMutationOptions<
  unknown,
  DefaultError,
  BookType,
  unknown
>;
