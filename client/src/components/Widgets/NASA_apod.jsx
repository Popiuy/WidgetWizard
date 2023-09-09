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

  //As of now, useEffect will be run everytime the widget is rendered. 
  //And we get 1,000 requests per hour, so why not??
    
  useEffect(() => {
    const fetchAPODData = async () => {
      
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=ldu00DPMmJO4nb9rTFgemhoA8TEwoKso0Adud0pe'
      );

      const APOD = response.json();

      
      if (APOD) {         
        setPhotoData({        
          date: APOD.date,    
          title: APOD.title,
          src: APOD.url,
          caption: APOD.explanation,
          photographer: APOD.hdurl,
          description: APOD.description,
        });
      }
    };

    fetchAPODData();
  });

  return (
    <div>
      <div className="card" style={{width:"18rem"}}>
          <div className="card-body">
            <div className="photo-title">{photo.title}</div>
            <h5 className="card-title">Astronomy Picture of the Day</h5>
              <img src={photo.src} className="card-img-top" alt={photo.title}></img>
              <div className="caption">{photo.caption}</div>
              <div className="photo-credit">{photo.photographer}</div>
              <div className="description">{photo.description}</div>
              <div className="date">{photo.date}</div>
            <a href="/APOD" className="btn btn-primary">Go to Widget</a>
          </div>
      </div>
    </div>
  );
}