import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Info, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { StatusBadge } from '@/components/status-badge';
import BookModal from './book-modal';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BooksTablePropsType, GetBookInfoType } from '@/utils/types';

const BooksTable = (props: BooksTablePropsType) => {
  const { bookList, libraryByBookId, onAddToLibrary, isAddingBookId } = props;
  const { isAdmin } = useAuth();
  const [previewBook, setPreviewBook] = useState<GetBookInfoType | null>(null);

  return (
    <>
      <div className='overflow-hidden rounded-xl border bg-card/80 shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-12'>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className='hidden md:table-cell'>Author</TableHead>
              <TableHead className='hidden md:table-cell'>Year</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookList?.map((book, index: number) => {
              const libraryItem = libraryByBookId?.[book._id];
              return (
                <TableRow key={book._id} className='hover-lift'>
                  <TableCell className='text-muted-foreground'>
                    {index + 1}
                  </TableCell>
                  <TableCell className='font-medium'>{book.title}</TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {book.author}
                  </TableCell>
                  <TableCell className='hidden md:table-cell text-muted-foreground'>
                    {book.publishYear}
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-wrap items-center justify-end gap-1'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => setPreviewBook(book)}
                        aria-label='Quick view'
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon' asChild>
                        <Link
                          to={`/books/details/${book._id}`}
                          aria-label='Details'
                        >
                          <Info className='h-4 w-4' />
                        </Link>
                      </Button>
                      {isAdmin ? (
                        <>
                          <Button variant='ghost' size='icon' asChild>
                            <Link
                              to={`/books/edit/${book._id}`}
                              aria-label='Edit'
                            >
                              <Pencil className='h-4 w-4' />
                            </Link>
                          </Button>
                          <Button variant='ghost' size='icon' asChild>
                            <Link
                              to={`/books/delete/${book._id}`}
                              aria-label='Delete'
                            >
                              <Trash2 className='h-4 w-4 text-destructive' />
                            </Link>
                          </Button>
                        </>
                      ) : null}
                      {libraryItem ? (
                        <StatusBadge status={libraryItem.status} />
                      ) : (
                        <Button
                          variant='outline'
                          size='sm'
                          disabled={isAddingBookId === book._id}
                          onClick={() => onAddToLibrary?.(book._id)}
                        >
                          {isAddingBookId === book._id ? 'Adding…' : 'Add'}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {previewBook ? (
        <BookModal
          book={previewBook}
          open={!!previewBook}
          onOpenChange={(open) => {
            if (!open) setPreviewBook(null);
          }}
        />
      ) : null}
    </>
  );
};

export default BooksTable;
