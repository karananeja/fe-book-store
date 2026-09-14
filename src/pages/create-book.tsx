import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '@/components/back-button';
import Spinner from '@/components/spinner';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCreateBook } from '@/hooks/use-books';
import { BookType } from '@/utils/types';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();
  const { isPending, mutateAsync: createBook } = useCreateBook({
    onSuccess: () => navigate('/'),
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateBook = async () => {
    const newBook: BookType = { title, author, publishYear: +year };
    await createBook(newBook);
    enqueueSnackbar('Book Created Successfully', { variant: 'success' });
  };

  return (
    <div>
      <BackButton />
      <PageHeader
        title='Create book'
        description='Add a new title to the shared catalog.'
      />
      {isPending ? <Spinner /> : null}
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
          <Button onClick={handleCreateBook} disabled={isPending}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateBook;
