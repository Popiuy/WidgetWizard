import { useState, useEffect } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import {BREW_ADD_FAVORITE} from '../../utils/mutations';
// import { GET_BREW_FAVORITES } from '../../utils/queries';

export default function BreweryWidget() {
  const [searchInput, setSearchInput] = useState('');
  // const [viewFavorites, setViewFavorites] = useState(false) 
  // const [addToFavorites] = useMutation(BREW_ADD_FAVORITE);
  // const {data} = useQuery(GET_BREW_FAVORITES);
  const [brewData, setBrewData] = useState({
    name: '',
    brewery_type: '',
    street: '',
    city: '',
    state: '',
    phone: '',
    website_url: '',
  });

  const getData = async (searchInput) => {
    try {
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries/search?query=${searchInput}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Could not retrieve data.', error);
      return null;
    }
  };

  useEffect(() => {
    // Only fetch data when searchInput changes
    const fetchData = async () => {
      const data = await getData(searchInput);
      if (data && data.length > 0) {
        // display the first brewery
        const firstBrewery = data[0];
        setBrewData({
          name: firstBrewery.name,
          brewery_type: firstBrewery.brewery_type,
          street: firstBrewery.street,
          city: firstBrewery.city,
          state: firstBrewery.state,
          phone: firstBrewery.phone,
          website_url: firstBrewery.website_url,
        });
      } else {
        // Handle the case where no breweries were found
        setBrewData({
          name: 'No breweries found',
          brewery_type: '',
          street: '',
          city: '',
          state: '',
          phone: '',
          website_url: '',
        });
      }
    };

    fetchData();
  }, [searchInput]);

  return (
    <div>
      <div className="card" style={{ width: '15rem' }}>
        <div className="search-bar font">
          <input
            type="text"
            placeholder="Enter brewery name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="card-body">
          <h5 className="card-brewery font">Your Favorite Brewery Search Engine</h5>
          {/* {viewFavorites ? (
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
          
        ) : ( */}
          <div>
          <div className="font brewery-name">{brewData.name}</div>
          <div className="font brewery-brewery_type">Type: {brewData.brewery_type}</div>
          <div className="font brewery-address_1">
            Address: <a href={`https://www.google.com/maps?q=${brewData.street},${brewData.city},${brewData.state}`} target="_blank" rel="noopener noreferrer">{brewData.street}</a>
          </div>
          <div className="font brewery-city">City: {brewData.city}</div>
          <div className="font brewery-state">State: {brewData.state}</div>
          <div className="font brewery-phone">Phone: {brewData.phone}</div>
          <div className="font brewery-website_url">
            Website: <a href={brewData.website_url} target="_blank" rel="noopener noreferrer">{brewData.website_url}</a>
          </div>
          {/* <button className="favorite-btn mb-2" 
              onClick={()=>addToFavorites({
                variables: {
                  brewData: {...brewData}
                }
              })}>
              ⭐Add to Favorites⭐
            </button>
            <button className="font" onClick={()=>setViewFavorites(true)}>⭐View Favorites⭐</button> */}
            </div>
            {/* )} */}
        </div>
      </div>
    </div>
  );
}
