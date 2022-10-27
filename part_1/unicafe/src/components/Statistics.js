import React from "react";
import { StatisticsLine } from "./StatisticsLine";

export const Statistics = ({ good, neutral, bad, positive, total }) => {
  if (good > 0 || neutral > 0 || positive > 0) {
    return (
      <div>
        <h3>Statistics</h3>
        <StatisticsLine value={good} text={"Good"} />
        <StatisticsLine value={neutral} text={"Neutral"} />
        <StatisticsLine value={bad} text={"Bad"} />
        <StatisticsLine value={total} text={"Total"} />
        <StatisticsLine value={total / 3} text={"Average"} />
        <StatisticsLine value={0 ? "0" : positive} text={"Positive"} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <h3>No feedback given!</h3>
      </div>
    );
  }
};

// (good / (good + neutral + bad)) * 100;
