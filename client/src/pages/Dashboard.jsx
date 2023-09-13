//import widgets from widget library
//reference User.widgets
//display appropriate widgets
import { useState } from 'react';
import { ADD_WIDGET, DELETE_WIDGET } from '../utils/mutations'
import { GET_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import Draggable from 'react-draggable';

import brewLogo from '.././images/BREWERY.jpg'
import nbaLogo from '.././images/nbalogopt2.png'
import nasaLogo from '.././images/nasa_official.png'
import soundcloudLogo from '.././images/soundcloud.jpg'
import nytLogo from '.././images/nyt.jpg'
import randomcatfactLogo from '.././images/store-cat-img.png'
import jokeLogo from '.././images/jokes.jpeg'
import boredLogo from '.././images/bored.jpg'
import currencyLogo from '.././images/currency.jpg'
import webcamLogo from '.././images/webcam.jpg'

import getWidget from '../utils/widgets';


const Dashboard = () => {
  const {loading, data} = useQuery(GET_ME)
  
  // eslint-disable-next-line no-unused-vars
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
      currentWidgets.filter((widget) => widget.name !== widgetName),
      console.log(widgetName),
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
            <div className="widget-option">
                <a className="dropdown-item" href="#">
                Astronomy Picture of the Day!
                </a>
                <img className="nasalogo" src={nasaLogo} alt="NASA Logo" />
            </div>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('BoredAPIWidget');
            }}
          >
            <div className="widget-option">
                <a className="dropdown-item" href="#">
                BoredAPI!
                </a>
                <img className="boredlogo" src={boredLogo} alt="Bored Logo" />
            </div>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('CurrencyConverter');
            }}
          >
            <div className="widget-option">
                <a className="dropdown-item" href="#">
                Currency Widget!
                </a>
                <img className="currencylogo" src={currencyLogo} alt="Currency Logo" />
            </div>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('JokeAPIWidget');
            }}
          >
            <div className="widget-option">
                <a className="dropdown-item" href="#">
                Joke Widget!
                </a>
                <img className="jokelogo" src={jokeLogo} alt="Joke Logo" />
            </div>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('NBAWidget');
            }}
          >
            <div className="widget-option">
                <a className="dropdown-item" href="#">
                 NBAWidget!
                </a>
                <img className="nbalogo" src={nbaLogo} alt="NBA Logo" />
            </div>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('NYTimesWidget');
            }}
          >
            <div className="widget-option">
                <a className="dropdown-item" href="#">
                New York Times!
                </a>
                <img className="nytlogo" src={nytLogo} alt="NBA Logo" />
            </div>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('BreweryWidget');
            }}
          >
            <div className="widget-option">
                <a className="dropdown-item" href="#">
                OpenBreweryWidget!
                </a>
                <img className="brewlogo" src={brewLogo} alt="Brewery Logo" />
            </div>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('CatFactWidget');
            }}
          >
            <div className="widget-option">
                <a className="dropdown-item" href="#">
                Random Cat Fact!
                </a>
                <img className="catlogo" src={randomcatfactLogo} alt="Brewery Logo" />
            </div>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('SoundCloudWidget');
            }}
          >
            <div className="widget-option">
                <a className="dropdown-item" href="#">
                Soundcloud!
                </a>
                <img className="catlogo" src={soundcloudLogo} alt="Brewery Logo" />
            </div>
          </li>
          <li
            onClick={() => {
              addWidgetHandler('webcamWidget');
            }}
          >
            <div className="widget-option">
                <a className="dropdown-item" href="#">
                Webcams from around the world!
                </a>
                <img className="catlogo" src={webcamLogo} alt="Brewery Logo" />
            </div>
          </li>
        </ul>
      </div>
      <div className="dashboard">
        {userWidgets.map((widgetName) =>{
          const Widget = getWidget(widgetName);

          return  (
            <Draggable
            key={widgetName}
            axis="both" // Allow both horizontal and vertical dragging
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            scale={1}
            onStart={eventLogger}
            onDrag={eventLogger}
            onStop={eventLogger}
            bounds="#root" // restrict every draggable div to the root of the page
          >
            <div className="widget">
        <div className="handle">Drag from here</div>
        <div className="widget-content"> 
          <Widget />
        </div>
        <button className="delete-btn" onClick={() => deleteWidgetHandler(widgetName)}>Delete</button>
      </div>
    </Draggable>
  )
        })}
      </div>
    </div>
  );
};

export default Dashboard;
