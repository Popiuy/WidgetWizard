//import widgets from widget library
//reference User.widgets
//display appropriate widgets
import { useState } from 'react';
import currencyWidget from '../components/Widgets/Currency-Converter'
import Draggable from 'react-draggable';
import BoredAPIWidget from '../components/Widgets/Bored';
import APODWidget from '../components/Widgets/NASA_apod';
import NBAWidget from '../components/Widgets/NBA';
import JokeAPIWidget from '../components/Widgets/JokeAPI';
import BreweryWidget from '../components/Widgets/OpenBrewery';
import CatFactWidget from '../components/Widgets/CatFact';
import webcamWidget from '../components/widgets/Webcam';
import NYTimesWidget from '../components/Widgets/NYTimes';
import SoundCloudWidget from '../components/Widgets/Soundcloud';


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
    <div className="body">
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
              addWidget(APODWidget);
            }}
          >
            <a className="dropdown-item" href="#">
              Astronomy Picture of the Day
            </a>
          </li>
          <li
            onClick={() => {
              addWidget(BoredAPIWidget);
            }}
          >
            <a className="dropdown-item" href="#">
              BoredAPI
            </a>
          </li>
          <li
            onClick={() => {
              addWidget(currencyWidget);
            }}
          >
            <a className="dropdown-item" href="#">
              Currency Widget
            </a>
          </li>
          <li
            onClick={() => {
              addWidget(JokeAPIWidget);
            }}
          >
            <a className="dropdown-item" href="#">
              Joke Widget
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
              addWidget(NYTimesWidget);
            }}
          >
            <a className="dropdown-item" href="#">
              New York Times
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
          <li
            onClick={() => {
              addWidget(CatFactWidget);
            }}
          >
            <a className="dropdown-item" href="#">
              Random Cat Fact
            </a>
          </li>
          <li
            onClick={() => {
              addWidget(SoundCloudWidget);
            }}
          >
            <a className="dropdown-item" href="#">
              Soundcloud
            </a>
          </li>
          <li
            onClick={() => {
              addWidget(webcamWidget);
            }}
          >
            <a className="dropdown-item" href="#">
              Webcams
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
          bounds="#root" // restrict every draggable div to the dashboard div
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
