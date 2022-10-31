import React from "react";

export const CountryDetails = ({ c }) => {
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
    </div>
  );
};
