import React, { useState, useEffect } from "react";
import axios from "axios";
import { CountryDetails } from "./components/CountryDetails";

export const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const onQueryChange = (e) => {
    setQuery(e.target.value);
    setSelectedCountry(null);
  };

  const handleClick = (c) => {
    setSelectedCountry(c);
    console.log(c);
  };

  useEffect(() => {
    const getData = async () => {
      const req = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(req.data);
    };

    getData();
  }, []);

  const renderSearch = () => {
    const arr = countries.filter((c) => c.name.common.toLowerCase().includes(query.toLowerCase()));
    if (arr.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (selectedCountry !== null) {
      console.log("im selected ");
      const c = selectedCountry;
      return <CountryDetails c={c} />;
    }

    if (arr.length < 11 && arr.length > 1) {
      return arr.map((c) => (
        <li key={c.ccn3}>
          {c.name.common} <button onClick={() => handleClick(c)}>show</button>
        </li>
      ));
    }

    if (arr.length === 1) {
      const c = arr[0];
      return <CountryDetails c={c} />;
    }
  };

  return (
    <div>
      <label>find countries: </label>
      <input value={query} onChange={onQueryChange} />
      <br />
      <ul>{renderSearch()}</ul>
    </div>
  );
};
