import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '@/components/back-button';
import Spinner from '@/components/spinner';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useGetBook, useUpdateBook } from '@/hooks/use-books';
import { BookType } from '@/utils/types';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { isLoading, data } = useGetBook(bookId!, { enabled: !!bookId });
  const { isPending, mutateAsync: updateBook } = useUpdateBook(bookId!, {
    onSuccess: () => navigate('/'),
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isLoading && data) {
      setTitle(data.info.title);
      setAuthor(data.info.author);
      setYear(`${data.info.publishYear}`);
    }
  }, [data, isLoading]);

  const handleUpdateBook = async () => {
    const newBook: BookType = { title, author, publishYear: +year };
    await updateBook(newBook);
    enqueueSnackbar('Book Updated Successfully', { variant: 'success' });
  };

  return (
    <div>
      <BackButton />
      <PageHeader
        title='Edit book'
        description='Update catalog details for this title.'
      />
      {isPending || isLoading ? <Spinner /> : null}
      <Card className='mx-auto max-w-xl border-border/80 bg-card/90'>
        <CardContent className='space-y-4 p-6'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='author'>Author</Label>
            <Input
              id='author'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='year'>Publish year</Label>
            <Input
              id='year'
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdateBook} disabled={isPending}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditBook;
