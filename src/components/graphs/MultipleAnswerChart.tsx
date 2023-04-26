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

interface MultipleAnswerChartProps {
  dataKey: string;
  [key: `string${string}`]: string;
}

export function MultipleAnswerChart(props: MultipleAnswerChartProps) {
  const { ["dataKey"]: dataKey, ...newProps } = props;
  const context = useDataContext();
  const data = useMemo(() => {
    const result: {
      [key: number]: { [key: `string${string}`]: number };
    } = {};
    Object.keys(newProps).map((k, index: number) => {
      result[index] = { order: index + 1 };
      Object.keys(newProps).map((k) => {
        result[index][newProps[k]] = 0;
      });
    });
    for (const entry of context.rows) {
      Object.keys(entry[dataKey]).map((k, index: number) => {
        result[index][entry[dataKey][k]] += 1;
      });
    }
    return Object.keys(result).map((k) => ({
      order: result[k]["order"],
      ...result[k],
    }));
  }, [context.rows]);

  return (
    <div>
      <ResponsiveContainer width={500} height={200}>
        <BarChart data={data}>
          <XAxis dataKey={"order"} />
          <YAxis />
          <Tooltip />
          {Object.keys(newProps).map((k) => (
            <Bar key={newProps[k]} dataKey={newProps[k]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
