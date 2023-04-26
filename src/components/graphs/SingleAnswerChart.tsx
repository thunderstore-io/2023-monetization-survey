"use client";

import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDataContext } from "@/components/DataContext";

interface SingleAnswerChartProps {
  dataKey?: string;
  [key: `string${string}`]: string;
}

export function SingleAnswerChart(props: SingleAnswerChartProps) {
  const { ["dataKey"]: dataKey, ...newProps } = props;
  const context = useDataContext();
  const data = useMemo(() => {
    const result: {
      [key: string]: { count: number };
    } = {};
    Object.keys(newProps).map((k) => (result[newProps[k]] = { count: 0 }));
    for (const entry of context.rows) {
      result[entry[dataKey]].count += 1;
    }
    return Object.keys(result).map((k) => ({
      answer: k,
      count: result[k].count,
    }));
  }, [context.rows]);

  return (
    <div>
      <ResponsiveContainer width={500} height={200}>
        <BarChart data={data}>
          <XAxis dataKey={"answer"} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={"count"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
