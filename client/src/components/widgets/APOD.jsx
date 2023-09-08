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
      <header className="title">{photo.title}</header>
      <img className="photos" src={photo.src} alt={photo.title} />
      <div className="caption">{photo.caption}</div>
      <div className="photo-credit">{photo.photographer}</div>
      <div className="description">{photo.description}</div>
      <div className="date">{photo.date}</div>
    </div>
  );
}