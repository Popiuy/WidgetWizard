import { useState, useEffect } from 'react';

export default function APODWidget() {
  const [photoData, setPhotoData] = useState({
    date: '',
    title: '',
    src: '',
    caption: '',
    photographer: '',
    description: '',
  });

  const [error, setError] = useState(null);

  const getData = async () => {
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

  const addToFavorites = async () => {
    // Implement your logic to add photoData to favorites here
    console.log(photoData);
  };

  return (
    <div>
      <div class="card mb-3" style={{width: '700px'}}>
        <div class="row g-0">
          <div class="col-md-4">
            <img src={photoData.src} class="img-fluid rounded-start" alt={photoData.title}></img>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Astronomy Photo of the Day</h5>
              <p class="card-text">{photoData.title}</p>
              <p class="card-text"><small class="text-body-secondary">{photoData.date}</small></p>
              <a href="/" className="btn btn-primary">
                Go to Widget
              </a>
              <button className="favorite-btn" onClick={addToFavorites}>
                ADD TO FAVORITES!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}