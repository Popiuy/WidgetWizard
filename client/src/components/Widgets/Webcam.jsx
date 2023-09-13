// https://rapidapi.com/webcams.travel/api/webcams-travel
// Provides webcams around the world based on lat, long
// key = gFFaX8hEsYH01S9RYHYwq712ZZs7FOzB

import React, { useState, useEffect } from 'react';
// import { useState, useEffect } from 'react';

export default function webcamWidget() {

    const [webcamData, setWebcamData] = useState([]);
    const [error, setError] = useState(null);
    const [cityInfo, setCityInfo] = useState({
      latitude: '',
      longitude: '',
    });

    const searchWebcams = async () => {
        try {
            const response = await fetch(
                'https://api.windy.com/webcams/v3/list/nearby=${cityInfo.latitude},${cityInfo.longitude},10?key=gFFaX8hEsYH01S9RYHYwq712ZZs7FOzB'
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

    const handleSearch = async () => {
      const data = await searchWebcams();
      if (data.length > 0) {
        setWebcamData(data);
      }
    };

    useEffect(() => {
      // You can initialize the component with default coordinates or user's location here
      setCityInfo({ latitude: '40.7128', longitude: '-74.0060' });
    }, []);

    

    return (
      <div>
        <div className="font search-form">
          <h2 className="card-title my-2">Webcams Around The World</h2>
          <div className="font form-group">
            <label className="font mb-2" htmlFor="latitude">Latitude:</label>
            <input
              type="text"
              id="latitude"
              value={cityInfo.latitude}
              onChange={(e) => setCityInfo({ ...cityInfo, latitude: e.target.value })}
            />
          </div>
          <div className="font form-group">
            <label className="font mb-2" htmlFor="longitude">Longitude:</label>
            <input
              type="text"
              id="longitude"
              value={cityInfo.longitude}
              onChange={(e) => setCityInfo({ ...cityInfo, longitude: e.target.value })}
            />
          </div>
          <button className="btn btn-primary mb-2" onClick={handleSearch}>
            Search
          </button>
        </div>
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
      </div>
    );

}



