import { useEffect, useState } from "react";
import api from "../services/api";

const WeatherData = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const city = country.capital;

  useEffect(() => {
    api.getWeather(city).then((data) => setWeather(data));
  }, [city]);

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature: {weather?.main.temp} Celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <p>wind: {weather?.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherData;
