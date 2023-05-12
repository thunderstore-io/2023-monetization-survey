"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { Question } from "../Question/Question";

interface YesNoChartProps {
  dataKey: string;
  question?: string;
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
        total: total,
        answerSet: Object.keys(result).map((k) => ({
          answerText: k === "yes" ? "Yes" : "No",
          count: result[k].count,
          percentage: Math.round((result[k].count / total) * 100),
        })),
        direction: "horizontal",
      },
    ];
  }, [context.rows]);

  return <Chart answerGroups={data}></Chart>;
}
