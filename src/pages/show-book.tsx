import { useMemo, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { BookMarked, Calendar, Clock, User } from 'lucide-react';
import BackButton from '@/components/back-button';
import { BookCover } from '@/components/book-cover';
import Spinner from '@/components/spinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useGetBook } from '@/hooks/use-books';
import {
  useAddToLibrary,
  useGetLibrary,
  useUpdateLibraryItem,
} from '@/hooks/use-library';
import {
  BOOK_STATUS_LABELS,
  BOOK_STATUSES,
  BookStatus,
  GetBookInfoType,
  LibraryItemType,
} from '@/utils/types';

const ShowBook = () => {
  const { bookId } = useParams();
  const { isLoading, data } = useGetBook(bookId!, { enabled: !!bookId });
  const { data: libraryData } = useGetLibrary();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const book = data?.info;

  const libraryItem = useMemo(() => {
    return libraryData?.info?.find((item) => {
      const libraryBook =
        typeof item.bookId === 'object' && item.bookId !== null
          ? (item.bookId as GetBookInfoType)
          : null;
      const id =
        libraryBook?._id ||
        (typeof item.bookId === 'string' ? item.bookId : '');
      return id === bookId;
    }) as LibraryItemType | undefined;
  }, [libraryData, bookId]);

  const { mutate: addBook, isPending: isAdding } = useAddToLibrary({
    onSuccess: () => {
      enqueueSnackbar('Added to your library', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['get-library'] });
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.data?.errMessage || 'Could not add book'
        : 'Could not add book';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const { mutate: updateStatus } = useUpdateLibraryItem({
    onSuccess: () => {
      enqueueSnackbar('Status updated', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['get-library'] });
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.data?.errMessage || 'Update failed'
        : 'Update failed';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  return (
    <div>
      <BackButton />
      {isLoading || !book ? (
        <Spinner />
      ) : (
        <Card className='mt-4 overflow-hidden border-border/80 bg-card/90'>
          <CardContent className='grid gap-0 p-0 md:grid-cols-[280px_1fr]'>
            <div className='bg-muted/40 p-6 md:border-r md:border-border'>
              <BookCover
                title={book.title}
                author={book.author}
                bookId={book._id}
                className='mx-auto max-w-[240px] md:max-w-none'
              />
            </div>

            <div className='flex flex-col p-6 md:p-8'>
              <div className='space-y-4'>
                <h1 className='font-display text-3xl font-semibold leading-tight md:text-4xl'>
                  {book.title}
                </h1>
                <div className='flex flex-wrap gap-2'>
                  <Badge variant='outline' className='gap-1 font-normal'>
                    <User className='h-3.5 w-3.5' />
                    {book.author}
                  </Badge>
                  <Badge variant='outline' className='gap-1 font-normal'>
                    <Calendar className='h-3.5 w-3.5' />
                    {book.publishYear}
                  </Badge>
                </div>

                <p className='flex items-start gap-2 text-sm leading-relaxed text-muted-foreground'>
                  <BookMarked className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
                  <span>
                    Catalog entry from BookShelf. Add it to your library to track
                    progress from want-to-read through completed.
                  </span>
                </p>
              </div>

              <Separator className='my-6' />

              <div className='space-y-3 text-sm'>
                <DetailRow
                  icon={<Clock className='h-3.5 w-3.5' />}
                  label='Added to catalog'
                  value={new Date(book.createdAt).toLocaleString()}
                />
                <DetailRow
                  icon={<Clock className='h-3.5 w-3.5' />}
                  label='Last updated'
                  value={new Date(book.updatedAt).toLocaleString()}
                />
              </div>

              <div className='mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-6'>
                {libraryItem ? (
                  <>
                    <span className='text-sm text-muted-foreground'>
                      Your status
                    </span>
                    <Select
                      value={libraryItem.status}
                      onValueChange={(value) =>
                        updateStatus({
                          id: libraryItem._id,
                          status: value as BookStatus,
                        })
                      }
                    >
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BOOK_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {BOOK_STATUS_LABELS[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                ) : (
                  <Button
                    disabled={isAdding || !bookId}
                    onClick={() => bookId && addBook({ bookId })}
                  >
                    {isAdding ? 'Adding…' : 'Add to library'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon?: ReactNode;
}) => (
  <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4'>
    <span className='flex w-40 shrink-0 items-center gap-1.5 text-muted-foreground'>
      {icon}
      {label}
    </span>
    <span className='font-medium'>{value}</span>
  </div>
);

export default ShowBook;
