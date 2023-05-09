"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { IDataEntry } from "@/data/types";

interface SingleAnswerChartProps {
  dataKey: keyof IDataEntry;
  direction?: string | "vertical" | "horizontal";
}

export function SingleAnswerChart(props: SingleAnswerChartProps) {
  const { ["dataKey"]: dataKey, ["direction"]: direction, ...newProps } = props;
  const context = useDataContext();
  const data = useMemo(() => {
    const result: {
      [key: string]: { count: number };
    } = {};
    Object.keys(newProps).map((k) => (result[newProps[k]] = { count: 0 }));
    let total = 0;
    for (const entry of context.rows) {
      if (!entry[dataKey]) continue;
      result[entry[dataKey]].count += 1;
      total += 1;
    }
    // return Object.keys(result).map((k) => ({
    //   answer: k,
    //   count: result[k].count,
    // }));

    return [
      {
        direction: direction,
        answerSet: Object.keys(result).map((k) => ({
          answerText: k,
          percentage: Math.round((result[k].count / total) * 100),
        })),
      },
    ];
  }, [context.rows]);

  return <Chart answerGroup={data}></Chart>;
}
