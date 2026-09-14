import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Info, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { StatusBadge } from '@/components/status-badge';
import BookModal from './book-modal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookCardPropsType } from '@/utils/types';

const BookCard = (props: BookCardPropsType) => {
  const { book, libraryItem, onAddToLibrary, isAdding } = props;
  const { isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className='hover-lift relative overflow-hidden border-l-4 border-l-primary bg-card/90'>
        <CardHeader className='pb-2'>
          <p className='text-xs text-muted-foreground'>{book.publishYear}</p>
          <CardTitle className='font-display text-xl leading-snug'>
            {book.title}
          </CardTitle>
          <p className='text-sm text-muted-foreground'>{book.author}</p>
        </CardHeader>
        <CardContent />
        <CardFooter className='flex flex-wrap items-center gap-1'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setShowModal(true)}
            aria-label='Quick view'
          >
            <Eye className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' asChild>
            <Link to={`/books/details/${book._id}`} aria-label='Details'>
              <Info className='h-4 w-4' />
            </Link>
          </Button>
          {isAdmin ? (
            <>
              <Button variant='ghost' size='icon' asChild>
                <Link to={`/books/edit/${book._id}`} aria-label='Edit'>
                  <Pencil className='h-4 w-4' />
                </Link>
              </Button>
              <Button variant='ghost' size='icon' asChild>
                <Link to={`/books/delete/${book._id}`} aria-label='Delete'>
                  <Trash2 className='h-4 w-4 text-destructive' />
                </Link>
              </Button>
            </>
          ) : null}
          <div className='ml-auto'>
            {libraryItem ? (
              <StatusBadge status={libraryItem.status} />
            ) : (
              <Button
                variant='outline'
                size='sm'
                disabled={isAdding}
                onClick={() => onAddToLibrary?.(book._id)}
              >
                {isAdding ? 'Adding…' : 'Add'}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <BookModal
        book={book}
        open={showModal}
        onOpenChange={setShowModal}
      />
    </>
  );
};

export default BookCard;
