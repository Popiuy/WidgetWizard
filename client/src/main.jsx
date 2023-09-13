import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {

        path: '/dashboard',
        // change back to /dashboard/username
        element: <Dashboard />
      },
      {
        path: '/dashboard/:username',
        element: <Dashboard />
      },
      {
        path: '/error',
        element: <ErrorPage />
      },
      {
        path: '/about',
        element: <About />
      },
      
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)