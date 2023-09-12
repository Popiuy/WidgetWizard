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
                'https://api.windy.com/webcams/v3/list/nearby=40.7128,-74.0060,10?key=gFFaX8hEsYH01S9RYHYwq712ZZs7FOzB'
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data.result.webcams;
        } catch (error) {
          console.error('Error fetching Webcams API data:', error);
          setError('Failed to retrieve webcam data. Please try again later.');
          return [];
        }
      };


    useEffect(() => {
      const fetchWebcams = async () => {
        const data = await searchWebcams();
        if (data.length > 0) {
          setWebcamData(data);
        }
      };
  
      fetchWebcams();
    }, []);




    return (
      <div>
        {webcamData.map((webcam, index) => (
          <div key={index} className="card mb-3" style={{ width: '700px' }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={webcam.image.current.preview}
                  className="img-fluid rounded-start"
                  alt={webcam.title}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Webcam {index + 1}</h5>
                  <p className="card-text">{webcam.title}</p>
                  <p className="card-text">
                    <small className="text-muted">Location: {webcam.location.city}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {error && <p>{error}</p>}
      </div>
    );

}


