import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

export default function App() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(false);
  const [weather, setWeather] = useState({});

  function callWeather(response) {
    setResult(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1dbf926d3b4417bf379db7043bec1047&units=metric`;
    axios.get(apiUrl).then(callWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (result) {
    return (
      <div>
        {form}
          <h1>{city}</h1>
          <h3>{weather.description}</h3>
          <img src={weather.icon} alt="weather" />
          <p>Temperature: {Math.round(weather.temperature)}°C</p> 
         <p>Humidity: {weather.humidity}%</p>
         <p>Wind: {weather.wind}km/h</p>
      </div>
    );
  } else {
    return form;
  }
}

