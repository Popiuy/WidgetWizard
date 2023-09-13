import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {NBA_ADD_FAVORITE} from '../../utils/mutations';
import { GET_NBA_FAVORITES } from '../../utils/queries';

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

  const [addToFavorites] = useMutation(NBA_ADD_FAVORITE);
  const {data} = useQuery(GET_NBA_FAVORITES);
  const [viewFavorites, setViewFavorites] = useState(false) 

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
} catch (error) {
  console.error(error);
}

  };

  const handleSearchClick = () => {
    console.log(searchInput);
    getData();
  };

  return (
    <div>
      <div className="card widget" style={{ width: '15rem' }}>
        <div className="search-bar">
          <input type="text" placeholder="Enter NBA team name" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <button onClick={handleSearchClick}>Search</button>
        </div>
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
        <div className="card-body">
          <h5 className="card-teamData">Your Favorite NBA Team</h5>
          <div className="teamData-name">{teamData.name}</div>
          <img src={teamData.logo} className="card-img-top" alt={teamData.name} />
          <div className="teamData-city">City: {teamData.city}</div>
          <div className="teamData-allStar">{teamData.allStar}</div>
          <div className="teamData-nbaFranchise">{teamData.nbaFranchise}</div>
          <button className="favorite-btn" 
              onClick={()=>addToFavorites({
                variables: {
                  teamData: {...teamData}
                }
              })}>
              ⭐Add to Favorites⭐
            </button>
            <button onClick={()=>setViewFavorites(true)}>⭐View Favorites⭐</button>
        </div>
        )}
      </div>
    </div>
  );
}
