import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Forecast = ({ lat, lon }) => {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get('http://localhost:3000/forecast', {
          params: { lat, lon },
        });
        console.log('Forecast Response:', response.data);
        setForecast(response.data);
      } catch (error) {
        console.error('Error fetching forecast:', error);
        setError('Error fetching forecast.');
      }
    };
    fetchForecast();
  }, [lat, lon]);

  return forecast ? (
    <div>
      <h2>Weather Forecast</h2>
      {forecast.list.slice(0, 1).map((item) => ( // Adjust slice(0, 5) to limit entries
        <div key={item.dt}>
          <p>{new Date(item.dt * 1000).toLocaleString()}</p>
          <p>Temperature: {item.main.temp} °C</p>
          <p>Condition: {item.weather[0].description}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>{error || 'Loading forecast...'}</p>
  );
};

export default Forecast;
