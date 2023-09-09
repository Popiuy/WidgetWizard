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

  const getData = async () => {
    try {
      // Implement rate limiting by adding a delay between requests
      await new Promise((resolve) => setTimeout(resolve, 100000)); // Wait for 1 second before making the request
  
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=ldu00DPMmJO4nb9rTFgemhoA8TEwoKso0Adud0pe'
      );
  
      return response.json();
    } catch (error) {
      console.error('Could not retrieve photo.', error);
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
  });

  const addToFavorites = async (photoData) => {
    //mutation
    //push photoData to user's field
    console.log(photoData);
  }

  return (
    <div>
      <div className="card" style={{width:"50rem"}}>
          <div className="card-body">
            <h5 className="card-title">Astronomy Picture of the Day</h5>
            <div className="photo-title">{photoData.title}</div>
              <img src={photoData.src} className="card-img-top" alt={photoData.title}></img>
              <div className="photo-caption">{photoData.caption}</div>
              <div className="photo-credit">{photoData.photographer}</div>
              <div className="photo-description">{photoData.description}</div>
              <div className="photo-date">{photoData.date}</div>
            <a href="/APOD" className="btn btn-primary">Go to Widget</a>
            <button className="favorite-btn" onClick={addToFavorites}>ADD TO FAVORITES!</button>
          </div>
      </div>
    </div>
  );
}