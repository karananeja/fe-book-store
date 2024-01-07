import Spinner from '@/components/Spinner';
import { useGetBooks } from '@/hooks/useBooks';
import { Icons } from '@/utils/Icons';
import { GetBookInfoType } from '@/utils/types';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isLoading, data } = useGetBooks();

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <Icons.add className='text-sky-800 text-4xl' />
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
                Author
              </th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
                Publish Year
              </th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {data?.info.map((book: GetBookInfoType, index: number) => (
              <tr key={book._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {book.title}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.author}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.publishYear}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/books/details/${book._id}`}>
                      <Icons.info className='text-2xl text-green-800' />
                    </Link>

                    <Link to={`/books/edit/${book._id}`}>
                      <Icons.edit className='text-2xl text-yellow-600' />
                    </Link>

                    <Link to={`/books/delete/${book._id}`}>
                      <Icons.delete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
