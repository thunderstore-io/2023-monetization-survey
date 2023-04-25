"use client";

import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const ExampleChart: React.FC = () => {
  const data = [
    {
      score: 5,
    },
    {
      score: 8,
    },
    {
      score: 2,
    },
    {
      score: 3,
    },
  ];
  return (
    <ResponsiveContainer width={400} height={200}>
      <LineChart data={data}>
        <XAxis />
        <YAxis />
        <Tooltip />
        <Line dataKey={"score"} />
      </LineChart>
    </ResponsiveContainer>
  );
};
