import CountryData from "./CountryData";
import WeatherData from "./WeatherData";

const Country = ({ country, filteredCountries }) => {
  if (!country || filteredCountries.length > 1) {
    return null;
  }
  return (
    <>
      <CountryData country={country} />
      <WeatherData country={country} />
    </>
  );
};
export default Country;
