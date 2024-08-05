import axios from "axios";

const countryUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherUrl = "https://api.openweathermap.org/data/2.5";
const api_key = import.meta.env.VITE_SOME_KEY;

const getCountries = () => {
  const request = axios.get(countryUrl);
  return request.then((response) => response.data);
};

const getWeather = (city) => {
  const request = axios.get(
    `${weatherUrl}/weather?q=${city}&units=imperial&appid=${api_key}`
  );
  return request.then((response) => response.data);
};
export default { getCountries, getWeather };
