import React, { useState } from "react";
import { Button } from "./components/Button";
import { Statistics } from "./components/Statistics";

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const positive = total ? (good / (good + neutral + bad)) * 100 : 0;

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);
  return (
    <div>
      <h2>Give Feedback</h2>
      <Button name={"good"} handleClick={handleGood} />
      <Button name={"neutral"} handleClick={handleNeutral} />
      <Button name={"bad"} handleClick={handleBad} />

      <Statistics good={good} neutral={neutral} bad={bad} positive={positive} total={total} />
    </div>
  );
};
