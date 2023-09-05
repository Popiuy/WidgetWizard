import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/Header/loginForm';
// import pages

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        root: 'dashboard/:userId',
        element: <Dashboard />
        // edit this line
      },
      {
        root: 'landingpage',
        element: <LoginForm />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
