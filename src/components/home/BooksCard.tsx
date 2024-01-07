import { BooksCardPropsType } from '@/utils/types';
import BookCard from './BookCard';

const BooksCard = (props: BooksCardPropsType) => {
  const { bookList } = props;

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {bookList?.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BooksCard;
