
import { useState, useEffect } from 'react';

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

  return (
    <>
      <div className="card" style={{width:"18rem"}}>
        {/* <img src={photo.src} className="card-img-top" alt={photo.title}></img> */}
          <div className="card-body">
            <h5 className="card-title">Joke</h5>
            <div className="category">{joke.category}</div>
            <div className="joke">{joke.joke}</div>
            <a href="/Joke" className="btn btn-primary">Go to Widget</a>
          </div>
      </div>
    </>
  );
}