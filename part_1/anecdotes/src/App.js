import React, { useState } from "react";

export const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const [selected, setSelected] = useState(getRandomInt(anecdotes.length));
  const [points, setPoints] = useState({});

  const obj = { ...points };
  console.log(obj);

  const giveVote = () => {
    let idx = anecdotes.indexOf(anecdotes[selected]);
    if (idx in obj) {
      obj[idx] += 1;
      setPoints(obj);
    } else {
      obj[idx] = 1;
      setPoints(obj);
    }

    console.log(points);
  };

  let votes = points[anecdotes.indexOf(anecdotes[selected])];

  function getMaxValueKey(obj) {
    return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
  }

  let highest = getMaxValueKey(points);

  return (
    <div>
      <h2>{anecdotes[selected]}</h2>
      <h3>has {votes ? votes : "0"} votes</h3>
      <button onClick={() => giveVote()}>Vote</button>
      <button onClick={() => setSelected(getRandomInt(anecdotes.length))}>Next Joke</button>
      <br />
      <h2>Anecodete with the most votes</h2>
      <h3>{anecdotes[highest]}</h3>
      <h4>has {points[highest]} votes</h4>
    </div>
  );
};
