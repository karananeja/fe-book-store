import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { BookOpen } from 'lucide-react';
import Spinner from '@/components/spinner';
import { EmptyState } from '@/components/empty-state';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  useGetLibrary,
  useRemoveFromLibrary,
  useUpdateLibraryItem,
} from '@/hooks/use-library';
import {
  BOOK_STATUS_LABELS,
  BOOK_STATUSES,
  BookStatus,
  GetBookInfoType,
} from '@/utils/types';

const MyLibrary = () => {
  const [statusFilter, setStatusFilter] = useState<BookStatus | 'all'>('all');
  const { isLoading, data } = useGetLibrary(statusFilter);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['get-library'] });

  const { mutate: updateStatus } = useUpdateLibraryItem({
    onSuccess: () => {
      enqueueSnackbar('Status updated', { variant: 'success' });
      invalidate();
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.data?.errMessage || 'Update failed'
        : 'Update failed';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const { mutate: removeItem } = useRemoveFromLibrary({
    onSuccess: () => {
      enqueueSnackbar('Removed from library', { variant: 'success' });
      invalidate();
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.data?.errMessage || 'Remove failed'
        : 'Remove failed';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  return (
    <div>
      <PageHeader
        title='My Library'
        description='Update reading status or remove books from your shelf.'
      />

      <ToggleGroup
        type='single'
        value={statusFilter}
        onValueChange={(value) =>
          value && setStatusFilter(value as BookStatus | 'all')
        }
        variant='outline'
        size='sm'
        className='mb-6 flex flex-wrap justify-start'
      >
        <ToggleGroupItem value='all'>All</ToggleGroupItem>
        {BOOK_STATUSES.map((status) => (
          <ToggleGroupItem key={status} value={status}>
            {BOOK_STATUS_LABELS[status]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {isLoading ? (
        <Spinner />
      ) : !data?.info?.length ? (
        <EmptyState
          icon={<BookOpen className='h-10 w-10' />}
          title='Nothing here yet'
          description='Browse the catalog and add books to start tracking what you want to read.'
          actionLabel='Browse catalog'
          actionTo='/'
        />
      ) : (
        <div className='flex flex-col gap-3'>
          {data.info.map((item) => {
            const book =
              typeof item.bookId === 'object' && item.bookId !== null
                ? (item.bookId as GetBookInfoType)
                : null;

            return (
              <Card
                key={item._id}
                className='hover-lift border-border/80 bg-card/90'
              >
                <CardContent className='flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between'>
                  <div>
                    <h2 className='font-display text-xl font-semibold'>
                      {book?.title || 'Unknown book'}
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                      {book?.author}
                      {book?.publishYear ? ` · ${book.publishYear}` : ''}
                    </p>
                    {book?._id ? (
                      <Link
                        to={`/books/details/${book._id}`}
                        className='mt-1 inline-block text-sm font-medium underline-offset-4 hover:underline'
                      >
                        View details
                      </Link>
                    ) : null}
                  </div>

                  <div className='flex flex-wrap items-center gap-2'>
                    <Select
                      value={item.status}
                      onValueChange={(value) =>
                        updateStatus({
                          id: item._id,
                          status: value as BookStatus,
                        })
                      }
                    >
                      <SelectTrigger className='w-[160px]'>
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
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyLibrary;
