import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {NASA_ADD_FAVORITE} from '../../utils/mutations';
import { GET_NASA_FAVORITES } from '../../utils/queries';

export default function APODWidget() {
  const [photoData, setPhotoData] = useState({
    date: '',
    title: '',
    src: '',
    caption: '',
    photographer: '',
    description: '',
  });
  const [addToFavorites, {error}] = useMutation(NASA_ADD_FAVORITE);
  const {loading, data} = useQuery(GET_NASA_FAVORITES);
  const [viewFavorites, setViewFavorites] = useState(false) 
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
      return null;
    }
  };

  useEffect(() => {
    const wrapper = async () => {
      const NASAdata = await getData();
      if (NASAdata) {
        setPhotoData({
          date: NASAdata.date,
          title: NASAdata.title,
          src: NASAdata.url,
          caption: NASAdata.explanation,
          photographer: NASAdata.hdurl,
          description: NASAdata.description,
        });
      }
    };

    wrapper();
  }, []); // Provide an empty dependency array to run the effect once on mount

  return (
    <div>
      <div className="card" style={{ width: '50rem' }}>
        <div className="card-body">
          <h5 className="card-title">Astronomy Picture of the Day</h5>
          {viewFavorites ? (
            <div className="favorites-display">
              {data.map((fav)=>{
                <div className="favorite-photo">
                  <div>{fav.title}</div>
                  <img src={fav.src} id={fav.title}/>
                  <div>{fav.caption}</div>
                </div>
              })}
              <button onClick={()=>setViewFavorites(false)}>⭐⭐⭐Photo of the Day⭐⭐⭐</button>
            </div>
            
          ) : (
            <div className="astronomy-photo-of-the-day-display">
              <div className="photo-title">{photoData.title}</div>
              <img
                src={photoData.src}
                className="card-img-top"
                alt={photoData.title}
              ></img>
              <div className="photo-caption">{photoData.caption}</div>
              <div className="photo-credit">{photoData.photographer}</div>
              <div className="photo-description">{photoData.description}</div>
              <div className="photo-date">{photoData.date}</div>
              <button className="favorite-btn" 
                onClick={()=>addToFavorites({
                  variables: {
                    photoData: {...photoData}
                  }
                })}>
                ⭐Add to Favorites⭐
              </button>
              <button onClick={()=>setViewFavorites(true)}>⭐View Favorites⭐</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}