"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { IDataEntry } from "@/data/types";

interface MultipleAnswerChartProps {
  dataKey: keyof IDataEntry;
  direction?: string | "vertical" | "horizontal";
}

export function MultipleAnswerChart(props: MultipleAnswerChartProps) {
  const { ["dataKey"]: dataKey, ["direction"]: direction, ...newProps } = props;
  const context = useDataContext();
  const data = useMemo(() => {
    const result: {
      [key: number]: {
        answers: { [key: `string${string}`]: number };
        total: number;
      };
    } = {};

    // Initialize object
    Object.keys(newProps).map((k, index: number) => {
      result[index] = { total: 0, answers: {} };
      Object.keys(newProps).map((k) => {
        result[index]["answers"][newProps[k]] = 0;
      });
    });

    // Count stuff
    for (const entry of context.rows) {
      if (!entry[dataKey]) continue;
      Object.keys(entry[dataKey]).map((k, index: number) => {
        result[index]["answers"][entry[dataKey][k]] += 1;
        result[index].total += 1;
      });
    }

    return Object.keys(result).map((k, i) => ({
      subQuestion: i + 1,
      direction: direction,
      answerSet: Object.keys(result[k]["answers"]).map((answerK) => ({
        answerText: answerK,
        percentage: Math.round(
          (result[k]["answers"][answerK] / result[k].total) * 100
        ),
      })),
    }));
  }, [context.rows]);

  return <Chart answerGroup={data}></Chart>;
}
