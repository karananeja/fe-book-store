import { Icons } from '@/utils/Icons';
import { BooksTablePropsType } from '@/utils/types';
import { Link } from 'react-router-dom';

const BooksTable = (props: BooksTablePropsType) => {
  const { bookList } = props;

  return (
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
        {bookList?.map((book, index: number) => (
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
                  <Icons.info className='text-2xl text-green-800 hover:text-black' />
                </Link>

                <Link to={`/books/edit/${book._id}`}>
                  <Icons.edit className='text-2xl text-yellow-600 hover:text-black' />
                </Link>

                <Link to={`/books/delete/${book._id}`}>
                  <Icons.delete className='text-2xl text-red-600 hover:text-black' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
