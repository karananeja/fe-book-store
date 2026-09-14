import BookCard from './book-card';
import { BooksCardPropsType } from '@/utils/types';

const BooksCard = (props: BooksCardPropsType) => {
  const { bookList, libraryByBookId, onAddToLibrary, isAddingBookId } = props;

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {bookList?.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          libraryItem={libraryByBookId?.[book._id]}
          onAddToLibrary={onAddToLibrary}
          isAdding={isAddingBookId === book._id}
        />
      ))}
    </div>
  );
};

export default BooksCard;
