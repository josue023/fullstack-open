import { useEffect, useState } from "react";
import Search from "./components/Search";
import Countries from "./components/Countries";
import api from "./services/api";
import Country from "./components/Country";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    api.getCountries().then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  const countryDataSelector = (name) => {
    const foundCountry = countries.find((c) => c.name.common === name);
    setCountry(foundCountry);
    setFilteredCountries([]);
  };

  return (
    <div>
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      <Countries
        search={search}
        filteredCountries={filteredCountries}
        countryDataSelector={countryDataSelector}
      />
      <Country country={country} filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
