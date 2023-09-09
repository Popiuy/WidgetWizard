import { useState, useEffect } from 'react';

export default function NBAWidget() {
  const [searchInput, setSearchInput] = useState('');
  const [teamData, setTeamData] = useState({
    name: '',
    city: '',
    logo: '',
    allStar: '',
    nbaFranchise: '',
  });

  useEffect(() => {
    console.log(teamData);
  }, [teamData]);

  const getData = async () => {
    const url = `https://api-nba-v1.p.rapidapi.com/teams?search=${searchInput}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '131fbfa580mshf39636636a7610bp1dae94jsn3bd29a6da00d',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    try {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  const teamInfo = data.response[0];
  if (!teamInfo) {
    throw new Error('No team found');
  }
  setTeamData({
    name: teamInfo.fullName,
    city: teamInfo.city,
    logo: teamInfo.logo,
    allStar: teamInfo.allStar,
    nbaFranchise: teamInfo.nbaFranchise,
  });
  console.log(teamData);
} catch (error) {
  console.error(error);
}

  };

  const handleSearchClick = () => {
    console.log(searchInput);
    getData();
  };

  const addToFavorites = () => {
    // Implement your logic to add teamData to favorites here
    console.log(teamData);
  };

  return (
    <div>
      <div className="card" style={{ width: '40rem' }}>
        <div className="search-bar">
          <input type="text" placeholder="Enter NBA team name" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <button onClick={handleSearchClick}>Search</button>
        </div>
        <div className="card-body">
          <h5 className="card-teamData">Your Favorite NBA Team</h5>
          <div className="teamData-name">{teamData.name}</div>
          <img src={teamData.logo} className="card-img-top" alt={teamData.name} />
          <div className="teamData-city">City: {teamData.city}</div>
          <div className="teamData-allStar">{teamData.allStar}</div>
          <div className="teamData-nbaFranchise">{teamData.nbaFranchise}</div>
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
