import React, { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Search from './components/Search';
import './App.css';

const App = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
          console.error(error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>HELLO ORACLE</h1>
        </div>
      </header>

      <div className="body">
        <div className="container">
          <div className="section glass-container">
            <CurrentWeather lat={location.lat} lon={location.lon} />
          </div>
        </div>
        <div className="container">
          <div className="section glass-container">
            <Forecast lat={location.lat} lon={location.lon} />
          </div>
        </div>
        <div className="container">
          <div className="section glass-container">
            <Search />
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>Developed By Srihariharan</p>
      </footer>
    </div>
  );
};

export default App;
