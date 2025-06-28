import { createRoot } from 'react-dom/client';
import store from './store/store.js';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './components/AuthLayout.jsx';
import { Home, Login, Signup, Allpost, Post, Editpost, Addpost } from './Pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication={true}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication={true}>
            <Allpost />
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication={true}>
            <Addpost />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication={true}>
            <Editpost />
          </AuthLayout>
        ),
      },
      {
        path: '/post/:slug',
        element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
