import { Icons } from '@/utils/Icons';
import { BackButtonPropsType } from '@/utils/types';
import { Link } from 'react-router-dom';

const BackButton = (props: BackButtonPropsType) => {
  const { destination = '/' } = props;

  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
      >
        <Icons.arrowLeft className='text-2xl' />
      </Link>
    </div>
  );
};

export default BackButton;
