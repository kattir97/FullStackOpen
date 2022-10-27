import React from "react";

export const StatisticsLine = ({ value, text }) => {
  return (
    <p>
      {text}: {value}
    </p>
  );
};
