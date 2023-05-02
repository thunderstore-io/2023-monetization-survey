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
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis
            dataKey={"order"}
            stroke="hsl(var(--text-color--tertiary) / .25)"
            tick={{
              fill: "hsl(var(--text-color--tertiary))",
            }}
          />
          <YAxis
            stroke="hsl(var(--text-color--tertiary) / .25)"
            tick={{
              fill: "hsl(var(--text-color--tertiary))",
            }}
          />
          <Tooltip
            wrapperStyle={{
              outline: "none",
              borderRadius: "border-radius:var(--border-radius--default)",
            }}
            contentStyle={{
              color: "#fff",
              backgroundColor: "hsl(var(--surface-2))",
              border: "0",
              borderRadius: "var(--border-radius--default)",
              padding: ".35rem 1rem",
              boxShadow: "var(--box-shadow--default)",
            }}
            labelStyle={{
              color: "#fff",
              fontWeight: "700",
              fontSize: ".8rem",
            }}
            itemStyle={{
              color: "#fff",
              textTransform: "capitalize",
            }}
            cursor={false}
            separator={": "}
          />
          {Object.keys(newProps).map((k) => (
            <Bar
              key={newProps[k]}
              dataKey={newProps[k]}
              maxBarSize={64}
              fill="hsl(var(--color--cyber-green-5))"
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
