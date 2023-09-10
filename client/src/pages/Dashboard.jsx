//import widgets from widget library
//reference User.widgets
//display appropriate widgets
import bored from '../components/Widgets/Bored'
import APOD from '../components/Widgets/NASA_apod'
import NBAWidget from '../components/Widgets/NBA'
import jokeWidget from '../components/Widgets/JokeAPI'
import NYTimesWidget from '../components/Widgets/NYTimes';
import { useState } from 'react';

const Dashboard = () => {
  const [selectedWidgets, setSelectedWidgets] = useState([]);

  const addWidget = (widget) => {
    setSelectedWidgets([...selectedWidgets, widget]);
  };

  const deleteWidget = (widget) => {
    setSelectedWidgets((currentWidgets) =>
    currentWidgets.filter((item) => item !== widget)
    );
  };

  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Add Widget
        </button>
        <ul className="dropdown-menu">
          <li
            onClick={() => {
              addWidget(APOD);
            }}
          >
            <a className="dropdown-item" href="#">
              Astronomy Picture of the Day
            </a>
          </li>
          <li
            onClick={() => {
              addWidget(bored);
            }}
          >
            <a className="dropdown-item" href="#">
              BoredAPI
            </a>
          </li>
          <li
            onClick={() => {
              addWidget(NBAWidget);
            }}
          >
            <a className="dropdown-item" href="#">
              NBAWidget
            </a>
          </li>
          <li
            onClick={() => {
              addWidget(jokeWidget);
            }}
          >
            <a className="dropdown-item" href="#">
            jokeWidget
            </a>
          </li>
          <li
            onClick={() => {
              addWidget(NYTimesWidget);
            }}
          >
            <a className="dropdown-item" href="#">
            New York Times Widget
            </a>
          </li>
        </ul>
      </div>
      <div className="dashboard">
        <div>
          {selectedWidgets.map((Widget, index) => (
            <div key={index}>
              <Widget />
              <button onClick={() => deleteWidget(Widget)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;