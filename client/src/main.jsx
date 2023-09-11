import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import NYTimesWidget from './components/Widgets/NYTimes.jsx';

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
        // change back to /dashboard/:id
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
      {
        path: '/testing',
        element: <NYTimesWidget/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
