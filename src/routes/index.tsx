import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import Home from '@/pages/home';
import CreateBook from '@/pages/create-book';
import ShowBook from '@/pages/show-book';
import EditBook from '@/pages/edit-book';
import DeleteBook from '@/pages/delete-book';
import Login from '@/pages/login';
import Register from '@/pages/register';
import MyLibrary from '@/pages/my-library';
import Navbar from '@/components/navbar';
import {
  AdminRoute,
  GuestRoute,
  ProtectedRoute,
} from '@/components/protected-route';

const AppLayout = () => (
  <>
    <Navbar />
    <main className='mx-auto max-w-6xl px-4 py-8 page-enter'>
      <Outlet />
    </main>
  </>
);

export const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      element: <GuestRoute />,
      children: [
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <AppLayout />,
          children: [
            { path: '/', element: <Home />, index: true },
            { path: '/library', element: <MyLibrary /> },
            { path: '/books/details/:bookId', element: <ShowBook /> },
            {
              element: <AdminRoute />,
              children: [
                { path: '/books/create', element: <CreateBook /> },
                { path: '/books/edit/:bookId', element: <EditBook /> },
                { path: '/books/delete/:bookId', element: <DeleteBook /> },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: (
        <div className='flex min-h-screen items-center justify-center p-4 font-display text-2xl'>
          404 Not Found
        </div>
      ),
    },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
};
