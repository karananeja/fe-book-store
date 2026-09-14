import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { LayoutGrid, List, Plus } from 'lucide-react';
import Spinner from '@/components/spinner';
import BooksCard from '@/components/home/books-card';
import BooksTable from '@/components/home/books-table';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useAuth } from '@/hooks/use-auth';
import { useGetBooks } from '@/hooks/use-books';
import { useAddToLibrary, useGetLibrary } from '@/hooks/use-library';
import { GetBookInfoType, LibraryItemType } from '@/utils/types';

const Home = () => {
  const { isAdmin } = useAuth();
  const { isLoading, data } = useGetBooks();
  const { data: libraryData } = useGetLibrary();
  const [showType, setShowType] = useState('table');
  const [addingBookId, setAddingBookId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const libraryByBookId = useMemo(() => {
    const map: Record<string, LibraryItemType> = {};
    libraryData?.info?.forEach((item) => {
      const book =
        typeof item.bookId === 'object' && item.bookId !== null
          ? (item.bookId as GetBookInfoType)
          : null;
      const id =
        book?._id || (typeof item.bookId === 'string' ? item.bookId : '');
      if (id) map[id] = item;
    });
    return map;
  }, [libraryData]);

  const { mutate: addBook } = useAddToLibrary({
    onSuccess: () => {
      enqueueSnackbar('Added to your library', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['get-library'] });
      setAddingBookId(null);
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.data?.errMessage || 'Could not add book'
        : 'Could not add book';
      enqueueSnackbar(message, { variant: 'error' });
      setAddingBookId(null);
    },
  });

  const onAddToLibrary = (bookId: string) => {
    setAddingBookId(bookId);
    addBook({ bookId });
  };

  return (
    <div>
      <PageHeader
        title='Catalog'
        description='Browse the shared shelf and add titles to your library.'
        actions={
          <>
            <ToggleGroup
              type='single'
              value={showType}
              onValueChange={(value) => value && setShowType(value)}
              variant='outline'
              size='sm'
            >
              <ToggleGroupItem value='table' aria-label='Table view'>
                <List className='h-4 w-4' />
                Table
              </ToggleGroupItem>
              <ToggleGroupItem value='card' aria-label='Card view'>
                <LayoutGrid className='h-4 w-4' />
                Cards
              </ToggleGroupItem>
            </ToggleGroup>
            {isAdmin ? (
              <Button asChild size='sm'>
                <Link to='/books/create'>
                  <Plus className='h-4 w-4' />
                  Add book
                </Link>
              </Button>
            ) : null}
          </>
        }
      />

      {isLoading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable
          bookList={data?.info}
          libraryByBookId={libraryByBookId}
          onAddToLibrary={onAddToLibrary}
          isAddingBookId={addingBookId}
        />
      ) : (
        <BooksCard
          bookList={data?.info}
          libraryByBookId={libraryByBookId}
          onAddToLibrary={onAddToLibrary}
          isAddingBookId={addingBookId}
        />
      )}
    </div>
  );
};

export default Home;
