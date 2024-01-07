import { useState } from 'react';
import BackButton from '@/components/BackButton';
import Spinner from '@/components/Spinner';
import { useCreateBook } from '@/hooks/useBooks';
import { BookType } from '@/utils/types';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const navigate = useNavigate();
  const { isPending, mutateAsync: createBook } = useCreateBook({
    onSuccess: () => navigate('/'),
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateBook = async () => {
    const newBook: BookType = { title, author, publishYear: +year };
    await createBook(newBook);
    enqueueSnackbar('Book Created Successfully', { variant: 'success' });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {isPending ? <Spinner /> : null}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label htmlFor='text' className='text-xl mr-4 text-gray-500'>
            Title
          </label>
          <input
            id='text'
            type='text'
            className='border-2 border-gray-500 rounded-xl px-4 py-2 w-full'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label htmlFor='author' className='text-xl mr-4 text-gray-500'>
            Author
          </label>
          <input
            id='author'
            type='text'
            className='border-2 border-gray-500 rounded-xl px-4 py-2 w-full'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label htmlFor='year' className='text-xl mr-4 text-gray-500'>
            Publish Year
          </label>
          <input
            id='year'
            type='text'
            className='border-2 border-gray-500 rounded-xl px-4 py-2 w-full'
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <button
          className='p-2 bg-sky-300 my-8  rounded-xl'
          onClick={handleCreateBook}
          disabled={isPending}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
