import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import Home from '@/pages/Home';
import CreateBook from '@/pages/CreateBook';
import ShowBook from '@/pages/ShowBook';
import EditBook from '@/pages/EditBook';
import DeleteBook from '@/pages/DeleteBook';

export const AppRoutes = () => {
  const publicRoutes: RouteObject[] = [
    { path: '/', element: <Home />, index: true },
    {
      path: '/books',
      element: <Outlet />,
      children: [
        { path: 'create', element: <CreateBook /> },
        { path: 'details/:bookId', element: <ShowBook /> },
        { path: 'edit/:bookId', element: <EditBook /> },
        { path: 'delete/:bookId', element: <DeleteBook /> },
      ],
    },
    { path: '*', element: <div>404 Not Found!</div> },
  ];

  const element = useRoutes(publicRoutes);

  return <>{element}</>;
};
