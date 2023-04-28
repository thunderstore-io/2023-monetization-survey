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

interface YesNoChartProps {
  dataKey: string;
}

export function YesNoChart(props: YesNoChartProps) {
  const context = useDataContext();
  const data = useMemo(() => {
    const result: { [key: string]: { count: number } } = {
      yes: { count: 0 },
      no: { count: 0 },
    };
    for (const entry of context.rows) {
      if (entry[props.dataKey]) {
        result["yes"].count += 1;
      } else {
        result["no"].count += 1;
      }
    }
    return Object.keys(result).map((k) => ({
      group: k,
      count: result[k].count,
    }));
  }, [context.rows]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis
            dataKey={"group"}
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
          <Bar
            dataKey={"count"}
            maxBarSize={64}
            fill="hsl(var(--color--cyber-green-5))"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
