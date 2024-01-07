import BackButton from '@/components/BackButton';
import Spinner from '@/components/Spinner';
import { useGetBook } from '@/hooks/useBooks';
import { useParams } from 'react-router-dom';

const ShowBook = () => {
  const { bookId } = useParams();
  const { isLoading, data } = useGetBook(bookId!, { enabled: !!bookId });

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{data?.info._id}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{data?.info.title}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{data?.info.author}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{data?.info.publishYear}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>
              {data?.info.createdAt &&
                new Date(data?.info.createdAt).toString()}
            </span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>
              {data?.info.updatedAt &&
                new Date(data?.info.updatedAt).toString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
