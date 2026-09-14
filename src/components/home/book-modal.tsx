import { Link } from 'react-router-dom';
import { BookMarked, Calendar, User } from 'lucide-react';
import { BookCover } from '@/components/book-cover';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { BookModalPropsType } from '@/utils/types';

const BookModal = (props: BookModalPropsType) => {
  const { book, open, onOpenChange } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl gap-0 overflow-hidden p-0 sm:rounded-xl'>
        <div className='grid gap-0 sm:grid-cols-[220px_1fr]'>
          <div className='bg-muted/40 p-5 sm:border-r sm:border-border'>
            <BookCover
              title={book.title}
              author={book.author}
              bookId={book._id}
            />
          </div>

          <div className='flex flex-col p-6'>
            <DialogHeader className='space-y-3 text-left'>
              <DialogTitle className='font-display text-3xl leading-tight'>
                {book.title}
              </DialogTitle>
              <DialogDescription className='sr-only'>
                Quick view for {book.title} by {book.author}
              </DialogDescription>
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
            </DialogHeader>

            <div className='mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground'>
              <p className='flex items-start gap-2'>
                <BookMarked className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
                <span>
                  From the shared BookShelf catalog. Open the full page for more,
                  or add it to your library to track reading status.
                </span>
              </p>
            </div>

            <div className='mt-auto flex flex-wrap gap-2 pt-6'>
              <Button asChild onClick={() => onOpenChange(false)}>
                <Link to={`/books/details/${book._id}`}>View details</Link>
              </Button>
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookModal;
