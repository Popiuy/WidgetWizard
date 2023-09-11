//import widgets from widget library
//reference User.widgets
//display appropriate widgets
import { useState } from 'react';
import Draggable from 'react-draggable';
import bored from '../components/Widgets/Bored';
import APOD from '../components/Widgets/NASA_apod';
import NBAWidget from '../components/Widgets/NBA';
import jokeWidget from '../components/widgets/JokeAPI';
import BreweryWidget from '../components/Widgets/OpenBrewery';

const Dashboard = () => {
  const [selectedWidgets, setSelectedWidgets] = useState([]);

  const addWidget = (widget) => {
    setSelectedWidgets((currentWidgets) => [...currentWidgets, widget]);
  };

  const deleteWidget = (widgetName) => {
    setSelectedWidgets((currentWidgets) =>
      currentWidgets.filter((widget) => widget.name !== widgetName)
    );
  };

  const eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
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
              addWidget(BreweryWidget);
            }}
          >
            <a className="dropdown-item" href="#">
              OpenBreweryWidget
            </a>
          </li>
        </ul>
      </div>
      <div className="dashboard">
        {selectedWidgets.map((Widget) => (
          <Draggable
          key={Widget.name}
          axis="both" // Allow both horizontal and vertical dragging
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[25, 25]}
          scale={1}
          onStart={eventLogger}
          onDrag={eventLogger}
          onStop={eventLogger}
          // bounds=".dashboard" // restrict every draggable div to the dashboard div
        >
          <div className="widget">
      <div className="handle">Drag from here</div>
      <div className="widget-content"> 
        <Widget />
      </div>
      <button onClick={() => deleteWidget(Widget.name)}>Delete</button>
    </div>
  </Draggable>
))}
      </div>
    </div>
  );
};

export default Dashboard;
