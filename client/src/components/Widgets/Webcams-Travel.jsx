// https://rapidapi.com/webcams.travel/api/webcams-travel
// Provides webcams around the world based on lat, long
// key = gFFaX8hEsYH01S9RYHYwq712ZZs7FOzB


import { useState, useEffect } from 'react';

export default function webcamWidget() {

    const [webcamData, setWebcamData] = useState({
        city: '',
        key: 'gFFaX8hEsYH01S9RYHYwq712ZZs7FOzB',
    });

    const [error, setError] = useState(null);

    const searchWebcam = async () => {
        try {
            const response = await fetch(
                'https://api.windy.com/webcams/v3/webcams/list'
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching BoredAPI data:', error);
            setError('Failed to retrieve photo. Please try again later.');
            return null;
        }
    };


    useEffect(() => {
        const fetchWebcam = async () => {
          const data = await searchWebcam();
          if (data) {
            setWebcamData({
              date: data.date,
              title: data.title,
              src: data.url,
              caption: data.explanation,
              photographer: data.hdurl,
              description: data.description,
            });
          }
        };
        fetchWebcam();
    }, []);




    return (
        <div>
          <div class="card mb-3" style={{width: '700px'}}>
            <div class="row g-0">
              <div class="col-md-4">
                {/* replace references */}
                <img src={photoData.src} class="img-fluid rounded-start" alt={photoData.title}></img>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Webcams Around The World</h5>
                  {/* replace references */}
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


