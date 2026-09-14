import Spinner from '@/components/spinner';
import { useAuth } from '@/hooks/use-auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className='p-8 flex justify-center'>
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export const AdminRoute = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className='p-8 flex justify-center'>
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export const GuestRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='p-8 flex justify-center'>
        <Spinner />
      </div>
    );
  }

  if (user) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
