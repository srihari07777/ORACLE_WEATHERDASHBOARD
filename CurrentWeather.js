import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrentWeather = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://localhost:3000/current-weather', {
          params: { lat, lon },
        });
        console.log('Current Weather Response:', response.data); // Add this line
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching current weather:', error);
        setError('Error fetching current weather.');
      }
    };
    fetchWeather();
  }, [lat, lon]);

  return weather ? (
    <div>
      <h2>Current Weather</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  ) : (
    <p>{error || 'Loading current weather...'}</p>
  );
};

export default CurrentWeather;
