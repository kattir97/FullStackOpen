import React from "react";

export const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>;
};
