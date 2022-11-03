import React, { useEffect, useState } from "react";
import axios from "axios";

export const CountryDetails = ({ c }) => {
  const [wethData, setWeathData] = useState(null);
  const capital = c.capital;

  const options = {
    method: "GET",
    url: "https://yahoo-weather5.p.rapidapi.com/weather",
    params: { location: `${capital}`, format: "json", u: "f" },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_YAHOO_API_KEY,
      "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const loadData = async () => {
      const req = await axios.request(options);
      setWeathData(req.data);
    };

    loadData();
  }, [c]);

  return (
    <div>
      <h2>{c?.name?.common}</h2>
      <h4>Capital: {c.capital}</h4>
      <h4>Area: {c.area}</h4>
      <h4>languages:</h4>
      <ul>
        {Object.values(c.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <br />
      <img src={c.flags.png} alt="flag" />
      <br />
      <h2>Weather in {capital}</h2>
      <h3>temperature in {capital}:</h3>
      <ul>
        {wethData?.forecasts.map((key) => {
          return (
            <li>
              Day: {key.day}, High: {key.high}, Low: {key.low}, Weather: {key.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
