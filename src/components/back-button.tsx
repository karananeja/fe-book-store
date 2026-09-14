import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BackButtonPropsType } from '@/utils/types';

const BackButton = (props: BackButtonPropsType) => {
  const { destination = '/' } = props;

  return (
    <Button variant='outline' size='sm' asChild className='mb-2'>
      <Link to={destination}>
        <ArrowLeft className='h-4 w-4' />
        Back
      </Link>
    </Button>
  );
};

export default BackButton;
