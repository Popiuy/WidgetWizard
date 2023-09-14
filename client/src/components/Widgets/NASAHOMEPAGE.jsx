import { useState, useEffect } from 'react';
import nasa_logo from '../../images/nasa_official.png';

export default function APODHomePage() {
  const [photoData, setPhotoData] = useState({
    date: '',
    title: '',
    src: '',
    caption: '',
    photographer: '',
    description: '',
  });

  const [error, setError] = useState(null);

  const getData = async() => {
    try {
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=ldu00DPMmJO4nb9rTFgemhoA8TEwoKso0Adud0pe'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Could not retrieve photo.', error)
      setError('Failed to retrieve photo. Please try again later.');
      return null;
    }
  };

  useEffect(() => {
    const wrapper = async () => {
      const data = await getData();
      if (data) {
        setPhotoData({
          date: data.date,
          title: data.title,
          src: data.url,
          caption: data.explanation,
          photographer: data.hdurl,
          description: data.description,
        });
      }
    };

    wrapper();
  }, []); // Provide an empty dependency array to run the effect once on mount

  // const addToFavorites = async () => {
  //   // Implement your logic to add photoData to favorites here
  //   console.log(photoData);
  // };

  return (
    <div className="apod-card mx-auto">
      <div className="card">
        <div className="card-body">
        <img className="nasa-logo" src={nasa_logo}></img>
          <h5 className="card-title">Astronomy Picture of the Day</h5>
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              <div className="photo-title">{photoData.title}</div>
              <img
                src={photoData.src}
                className="card-img-top home-img"
                alt={photoData.title}
              ></img>
              <div className="font photo-caption">{photoData.caption}</div>
              <div className="font photo-credit">{photoData.photographer}</div>
              <div className="font photo-description">{photoData.description}</div>
              <div className="font photo-date">{photoData.date}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}