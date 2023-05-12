"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { IDataEntry } from "@/data/types";
import { Question } from "../Question/Question";

interface DynamicNumberAnswerChartProps {
  dataKey: keyof IDataEntry;
  direction?: string | "vertical" | "horizontal";
  question?: string;
}

export function DynamicNumberAnswerChart(props: DynamicNumberAnswerChartProps) {
  const {
    ["dataKey"]: dataKey,
    ["direction"]: direction,
    ["question"]: question,
  } = props;
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

  if (data.every((answerGroup) => answerGroup.total < 1)) return <></>;

  if (question) {
    return (
      <Question question={question}>
        <Chart answerGroups={data}></Chart>
      </Question>
    );
  } else {
    return <Chart answerGroups={data}></Chart>;
  }
}
