import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '@/components/back-button';
import Spinner from '@/components/spinner';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { useDeleteBook } from '@/hooks/use-books';

const DeleteBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { isPending, mutateAsync: deleteBook } = useDeleteBook({
    onSuccess: () => navigate('/'),
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = async () => {
    await deleteBook(bookId!);
    enqueueSnackbar('Book Deleted Successfully', { variant: 'success' });
  };

  return (
    <div>
      <BackButton />
      <PageHeader
        title='Delete book'
        description='This removes the title from the catalog and all user libraries.'
      />
      {isPending ? <Spinner /> : null}
      <Card className='mx-auto max-w-xl border-border/80 bg-card/90'>
        <CardContent className='space-y-6 p-6'>
          <p className='text-muted-foreground'>
            Are you sure you want to delete this book? This cannot be undone.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive' disabled={isPending}>
                Delete book
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  The book will be removed from the catalog and from every
                  reader&apos;s library.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  onClick={handleDeleteBook}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteBook;
