import React from "react";
import { Part } from "./Part";
import { Total } from "./Total";

export const Content = ({ arr }) => {
  return (
    <div>
      <ul>
        {arr.map((cs) => (
          <Part part={cs} key={cs.id} />
        ))}
      </ul>
      <Total data={arr} />
    </div>
  );
};
