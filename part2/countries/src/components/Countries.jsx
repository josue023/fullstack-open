import { useEffect } from "react";

const Countries = ({ search, filteredCountries, countryDataSelector }) => {
  useEffect(() => {
    if (filteredCountries.length === 1) {
      countryDataSelector(filteredCountries[0].name.common);
    }
  }, [filteredCountries, countryDataSelector]);

  if (search === "" || filteredCountries.length === 1) {
    return null;
  }

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      <ul>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => countryDataSelector(country.name.common)}>
              show
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
