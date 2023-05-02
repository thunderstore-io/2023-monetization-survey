"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";

interface YesNoChartProps {
  dataKey: string;
}

export function YesNoChart(props: YesNoChartProps) {
  const context = useDataContext();
  const data = useMemo(() => {
    let total = 0;
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
      total += 1;
    }

    return [
      {
        answerSet: Object.keys(result).map((k) => ({
          answerText: k === "yes" ? "Yes" : "No",
          total: total,
          percentage: Math.round((result[k].count / total) * 100),
        })),
        direction: "horizontal",
      },
    ];
  }, [context.rows]);

  return <Chart answerGroup={data}></Chart>;
}
