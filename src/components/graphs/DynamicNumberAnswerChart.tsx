"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { IDataEntry } from "@/data/types";

interface DynamicNumberAnswerChartProps {
  dataKey: keyof IDataEntry;
  direction?: string | "vertical" | "horizontal";
}

export function DynamicNumberAnswerChart(props: DynamicNumberAnswerChartProps) {
  const { ["dataKey"]: dataKey, ["direction"]: direction } = props;
  const context = useDataContext();
  const data = useMemo(() => {
    const result: {
      [key: number]: { count: number };
    } = {};
    let total = 0;
    for (const entry of context.rows) {
      if (!entry[dataKey]) continue;
      if (!result[entry[dataKey]]) {
        result[entry[dataKey]] = 1;
      } else {
        result[entry[dataKey]] += 1;
      }
      total += 1;
    }
    return [
      {
        direction: direction,
        total: total,
        answerSet: Object.keys(result).map((k) => ({
          answerText: k,
          count: result[k],
          percentage: Math.round((result[k] / total) * 100),
        })),
      },
    ];
  }, [context.rows]);

  return <Chart answerGroup={data}></Chart>;
}
