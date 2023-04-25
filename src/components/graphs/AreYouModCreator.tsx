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

export function AreYouModCreatorChart() {
  const context = useDataContext();
  const data = useMemo(() => {
    const result: { [key: string]: { count: number } } = {};
    for (const entry of context.rows) {
      const group = result[entry.ageGroup] ?? { count: 0 };
      group.count += 1;
      result[entry.ageGroup] = group;
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
