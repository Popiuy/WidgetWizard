import { useState } from 'react';

export default function NBAWidget() {
  const [searchInput, setSearchInput] = useState('');
  const [teamData, setTeamData] = useState({
    name: '',
    city: '',
    logo: '',
    allStar: '',
    nbaFranchise: '',
  });

  const getData = async () => {
    const url = `https://api-nba-v1.p.rapidapi.com/teams?search=${searchInput}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '131fbfa580mshf39636636a7610bp1dae94jsn3bd29a6da00d',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data && data.api && data.api.teams.length > 0) {
        const teamInfo = data.api.teams[0];
        setTeamData({
          name: teamInfo.fullName,
          city: teamInfo.city,
          logo: teamInfo.logo,
          allStar: teamInfo.allStar,
          nbaFranchise: teamInfo.nbaFranchise,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchClick = () => {
    getData();
  };

  const addToFavorites = () => {
    // Implement your logic to add teamData to favorites here
    console.log(teamData);
  };

  return (
    <div>
      <div className="card" style={{ width: '50rem' }}>
        <div className="search-bar">
          <input type="text" placeholder="Enter NBA team name" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <button onClick={handleSearchClick}>Search</button>
        </div>
        <div className="card-body">
          <h5 className="card-title">Your Favorite NBA Team</h5>
          <div className="photo-name">{teamData.name}</div>
          <img src={teamData.logo} className="card-img-top" alt={teamData.name} />
          <div className="photo-city">{teamData.city}</div>
          <div className="photo-allStar">{teamData.allStar}</div>
          <div className="photo-nbaFranchise">{teamData.nbaFranchise}</div>
          <a href="/NBA" className="btn btn-primary">
            Go to Widget
          </a>
          <button className="favorite-btn" onClick={addToFavorites}>
            ADD TO FAVORITES!
          </button>
        </div>
      </div>
    </div>
  );
}
