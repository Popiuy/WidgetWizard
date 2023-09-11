import { useState, useEffect } from 'react';

export default function BreweryWidget() {
  const [searchInput, setSearchInput] = useState('');
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

  const addToFavorites = () => {
    // Implement your logic to add brewData to favorites here
    console.log('Added to favorites:', brewData);
  };

  return (
    <div>
      <div className="card" style={{ width: '40rem' }}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter brewery name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="card-body">
          <h5 className="card-brewery">Your Favorite Brewery Search Engine</h5>
          <div className="brewery-name">{brewData.name}</div>
          <div className="brewery-brewery_type">Type: {brewData.brewery_type}</div>
          <div className="brewery-address_1">
            Address: <a href={`https://www.google.com/maps?q=${brewData.street},${brewData.city},${brewData.state}`} target="_blank" rel="noopener noreferrer">{brewData.street}</a>
          </div>
          <div className="brewery-city">City: {brewData.city}</div>
          <div className="brewery-state">State: {brewData.state}</div>
          <div className="brewery-phone">Phone: {brewData.phone}</div>
          <div className="brewery-website_url">
            Website: <a href={brewData.website_url} target="_blank" rel="noopener noreferrer">{brewData.website_url}</a>
          </div>
          <a href="/OpenBrewery" className="btn btn-primary">
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
