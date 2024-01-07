import Spinner from '@/components/Spinner';
import BooksCard from '@/components/home/BooksCard';
import BooksTable from '@/components/home/BooksTable';
import { useGetBooks } from '@/hooks/useBooks';
import { Icons } from '@/utils/Icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isLoading, data } = useGetBooks();
  const [showType, setShowType] = useState('table');

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>

        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>

      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <Icons.add className='text-sky-800 text-4xl' />
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable bookList={data?.info} />
      ) : (
        <BooksCard bookList={data?.info} />
      )}
    </div>
  );
};

export default Home;
