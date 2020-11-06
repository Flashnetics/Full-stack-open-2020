import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const apiKey = "b109e973f01229751261ef9803f02225";
  let baseUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`;
  const [image, setImage] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setWeather(response.data.current);
      setImage(response.data.current.weather_icons);
    });
  });

  return (
    <div>
      <div>
        {" "}
        <h3> Weather in {capital} </h3>
      </div>
      <p>
        <strong>temperature: </strong>
        {weather.temperature} Celcius{" "}
      </p>
      <div>
        <img src={image} alt="weather" />
      </div>
      <p>
        <strong>wind:{weather.wind_speed} </strong> kph{" "} direction {weather.wind_dir}
      </p>
      
    </div>
  );
};
export default Weather;
