import React from "react";

export const Persons = ({ renderSearch }) => {
  return (
    <div>
      <ul>{renderSearch()}</ul>
    </div>
  );
};
