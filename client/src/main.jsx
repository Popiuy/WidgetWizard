import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';

import SoundCloudWidget from './components/Widgets/Soundcloud.jsx';
import NBAWidget from './components/Widgets/NBA.jsx';
import BreweryWidget from './components/Widgets/OpenBrewery.jsx';
import BoredAPIWidget from './components/Widgets/Bored.jsx';
import JokeAPIWidget from './components/widgets/JokeAPI.jsx';
// import SoundCloudWidget from './components/Widgets/Soundcloud.jsx';
import CurrencyConverter from './components/Widgets/Currency-Converter.jsx';
import NYT from './utils/NYT.js';
import NYTimesWidget from './components/Widgets/NYTimes.jsx';
// import NYT



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
      },
      {
        path: '/OpenBrewery',
        element: <BreweryWidget/>
      },
      {
        path: '/NBA',
        element: <NBAWidget/>
      },
      {
        path: '/Bored',
        element: <BoredAPIWidget/>
      },
      {
        path: '/Joke',
        element: <JokeAPIWidget/>
      },
      {
        path: '/CurrencyConverter',
        element: <CurrencyConverter/>
      },
      {
        path: '/nytimes',
        element: <NYTimesWidget/>
      }
      // {
      //   path: '/testing',
      //   element: </>
      // }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)