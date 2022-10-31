import React from "react";

export const Filter = ({ onSearch }) => {
  return (
    <div>
      filter shown with: <input type="text" onChange={onSearch} />
    </div>
  );
};
