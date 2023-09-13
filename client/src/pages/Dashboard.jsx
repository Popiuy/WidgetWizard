//import widgets from widget library
//reference User.widgets
//display appropriate widgets
import { useState, useEffect } from 'react';
import { ADD_WIDGET, DELETE_WIDGET } from '../utils/mutations'
import { GET_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import Draggable from 'react-draggable';

// import currencyWidget from '../components/Widgets/Currency-Converter'
// import BoredAPIWidget from '../components/Widgets/Bored';
// import APODWidget from '../components/Widgets/NASA_apod';
// import NBAWidget from '../components/Widgets/NBA';
// import JokeAPIWidget from '../components/Widgets/JokeAPI';
// import BreweryWidget from '../components/Widgets/OpenBrewery';
// import CatFactWidget from '../components/Widgets/CatFact';
// import webcamWidget from '../components/widgets/Webcam';
// import NYTimesWidget from '../components/Widgets/NYTimes';
// import SoundCloudWidget from '../components/Widgets/Soundcloud';
import getWidget from '../utils/widgets';


const Dashboard = () => {
  const {loading, data} = useQuery(GET_ME)
  
  const [selectedWidgets, setSelectedWidgets] = useState([]);

  const userWidgets = data?.me?.widgets || [];

  const [ addWidget ] = useMutation(ADD_WIDGET);
  const [ deleteWidget ] = useMutation(DELETE_WIDGET);

  const addWidgetHandler = (widgetName) => {
    addWidget({
      variables: {
        widgetName
      }
    });
    const selectedWidget = getWidget(widgetName)
    setSelectedWidgets((currentWidgets) => [...currentWidgets, selectedWidget]);
  };

  const deleteWidgetHandler = (widgetName) => {
    deleteWidget({
      variables: {
        widgetName
      }, 
      refetchQueries: [GET_ME]
    });
    setSelectedWidgets((currentWidgets) =>
      currentWidgets.filter((widget) => widget.name !== widgetName)
    );
  };

  const eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  if(loading) {
    return (<h1>LOADING</h1>)
  }

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
              addWidgetHandler('APODWidget');
            }}
          >
            <a className="dropdown-item" href="#">
              Astronomy Picture of the Day
            </a>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('BoredAPIWidget');
            }}
          >
            <a className="dropdown-item" href="#">
              BoredAPI
            </a>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('currencyWidget');
            }}
          >
            <a className="dropdown-item" href="#">
              Currency Widget
            </a>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('JokeAPIWidget');
            }}
          >
            <a className="dropdown-item" href="#">
              Joke Widget
            </a>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('NBAWidget');
            }}
          >
            <a className="dropdown-item" href="#">
              NBAWidget
            </a>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('NYTimesWidget');
            }}
          >
            <a className="dropdown-item" href="#">
              New York Times
            </a>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('BreweryWidget');
            }}
          >
            <a className="dropdown-item" href="#">
              OpenBreweryWidget
            </a>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('CatFactWidget');
            }}
          >
            <a className="dropdown-item" href="#">
              Random Cat Fact
            </a>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('SoundCloudWidget');
            }}
          >
            <a className="dropdown-item" href="#">
              Soundcloud
            </a>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('webcamWidget');
            }}
          >
            <a className="dropdown-item" href="#">
              Webcams
            </a>
          </li>

        </ul>
      </div>
      <div className="dashboard">
        {userWidgets.map((widgetName) =>{
          const Widget = getWidget(widgetName);

          return  (
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
        <button onClick={() => deleteWidgetHandler(Widget.name)}>Delete</button>
      </div>
    </Draggable>
  )
        })}
      </div>
    </div>
  );
};

export default Dashboard;
