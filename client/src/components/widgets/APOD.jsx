import { useState } from 'react';

//fetch APOD
//src APOD
const searchAPOD = () => {
    return fetch(`https://api.nasa.gov/planetary/apod?api_key=ldu00DPMmJO4nb9rTFgemhoA8TEwoKso0Adud0pe`);
    
  };

export default async function APODWidget() {
    const [photo, setPhoto] = useState({
    date: '',
    title: '',
    src: '',
    caption: '',
    photographer: '',
    description: '',
});
   const APOD = await searchAPOD();
    console.log(APOD);
    setPhoto(searchAPOD.json);
    
    return (
        <div>
            <header className="title">{photo.title}</header> 
            <img className="photos" src={photo.src}></img>
            <div className="caption">{photo.caption}</div> 
            <div className="photo-credit">{photo.photographer}</div> 
            <div className="description">{photo.description}</div> 
            <div className="date">{photo.date}</div> 
        </div>
    )
}