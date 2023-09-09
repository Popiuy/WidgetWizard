import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { NASA_ADD_TO_FAVORITES } from '../../utils/mutations';

export default function APODWidget() {
  const {loading, favoritesData } = useQuery()
  const [NASAaddToFavorites, {error, data} ] = useMutation(NASA_ADD_TO_FAVORITES, {
    variables: {...photoData}
  })

  const [photoData, setPhotoData] = useState({
    date: '',
    title: '',
    src: '',
    caption: '',
    photographer: '',
    description: '',
  });

 //
  

  const getData = async() => {
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

  const addToFavorites = () => {
    NASAaddToFavorites();
    //display
  }

  const viewFavorites = async () => {
    //  define query
    //  fetch photos from graphQL
    //  display photos in grid
        //upon click, expand photo to be full size
    //
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
            <button className="favorite-btn" onClick={NASAaddToFavorites}>ADD TO FAVORITES!</button>
          </div>
      </div>
    </div>
  );
}


//TODOs
// - save last photo
// - display favorites
// - make each favorites clickable
//  - expand photo upon click to fill viewport