import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/search', {
        params: { city },
      });
      console.log('Search Weather Response:', response.data); // Log response data for debugging
      setWeather(response.data);
      setError(null);
    } catch (error) {
      console.error('Error searching weather:', error);
      setError('Error searching weather.');
      setWeather(null);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      {weather && (
        <div className="weather-info">
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Search;
