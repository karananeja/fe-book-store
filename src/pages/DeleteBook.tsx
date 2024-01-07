import BackButton from '@/components/BackButton';
import Spinner from '@/components/Spinner';
import { useDeleteBook } from '@/hooks/useBooks';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { isPending, mutateAsync: deleteBook } = useDeleteBook({
    onSuccess: () => navigate('/'),
  });

  const handleDeleteBook = async () => {
    await deleteBook(bookId!);
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {isPending ? <Spinner /> : null}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <h3 className='text-2xl'>Are you sure You want to delete this book?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
          disabled={isPending}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
