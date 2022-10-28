import React from "react";

export const Total = ({ data }) => {
  const getTotal = (arr) => {
    const res = arr.reduce((acc, curr) => acc + curr.exercises, 0);
    return res.toString();
  };
  return <h3>total of {getTotal(data)} exercises</h3>;
};
