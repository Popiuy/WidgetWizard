import { useState, useEffect } from 'react';

const searchAPOD = async () => {
  try {
    const response = await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=ldu00DPMmJO4nb9rTFgemhoA8TEwoKso0Adud0pe'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    return null;
  }
};

const retrieveData = async() => {
  try {
    const response = await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=ldu00DPMmJO4nb9rTFgemhoA8TEwoKso0Adud0pe'
    );
  
    return response.json();
  } catch (error) {
    console.error('Could not retreive photo.', error)
    return null;
  }
}

export default function APODWidget() {
  const [photo, setPhoto] = useState({
    date: '',
    title: '',
    src: '',
    caption: '',
    photographer: '',
    description: '',
  });

  useEffect(() => {
    const fetchAPODData = async () => {
      const apodData = await searchAPOD();
      if (apodData) {
        setPhoto({
          date: apodData.date,
          title: apodData.title,
          src: apodData.url,
          caption: apodData.explanation,
          photographer: apodData.hdurl,
          description: apodData.description,
        });
      }
    };

    fetchAPODData();
  }, []);

  return (
    <div>
      <div className="card" style={{width:"50rem"}}>
          <div className="card-body">
            <h5 className="card-title">Astronomy Picture of the Day</h5>
            <div className="photo-title">{photo.title}</div>
              <img src={photo.src} className="card-img-top" alt={photo.title}></img>
              <div className="photo-caption">{photo.caption}</div>
              <div className="photo-credit">{photo.photographer}</div>
              <div className="photo-description">{photo.description}</div>
              <div className="photo-date">{photo.date}</div>
            <a href="/APOD" className="btn btn-primary">Go to Widget</a>
          </div>
      </div>
    </div>
  );
}