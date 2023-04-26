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
      <ResponsiveContainer width={500} height={200}>
        <BarChart data={data}>
          <XAxis dataKey={"group"} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={"count"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
