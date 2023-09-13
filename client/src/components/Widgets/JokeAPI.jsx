
import { useState, useEffect } from 'react';
import jokesImage  from '../../images/jokes.jpeg'

export default function JokeAPIWidget() {
const searchJoke = async () => {
  try {
    const response = await fetch(
      'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching joke data:', error);
    return null;
  }
};

const [joke, setJoke] = useState({
  category: '',
  joke: '',
});

const fetchJoke = async () => {
  const jokeData = await searchJoke();
  if (jokeData) {
    setJoke({
      category: jokeData.category,
      joke: jokeData.joke,
    });
  }
};

useEffect(() => {
  fetchJoke();
}, []);

const addToFavorites = async () => {
  // Implement your logic to add photoData to favorites here
  console.log(joke);
};

  return (
    <>
      <div style={{width:"18rem"}}>
        {/* <img src={photo.src} className="card-img-top" alt={photo.title}></img> */}
          <div className="card-body">
            {/* <h5 className="card-title">Joke</h5> */}
            <img className="jokesImage" src={jokesImage} alt="Jokes Image" style={{ width: '100px', height: '75px' }}/>
            <div className="category">{joke.category}</div>
            <div className="joke">{joke.joke}</div>
            <button className="btn btn-primary" type="button" onClick={fetchJoke}>New Joke</button>
            <a href="/Joke" className="btn btn-primary">
                Go to Widget
              </a>
              <button className="favorite-btn" onClick={addToFavorites}>
                ADD TO FAVORITES!
              </button>
          </div>
      </div>
    </>
  );
}