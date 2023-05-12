"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { IDataEntry } from "@/data/types";
import { Question } from "../Question/Question";

interface SingleAnswerChartProps {
  dataKey: keyof IDataEntry;
  direction?: string | "vertical" | "horizontal";
  question?: string;
}

export function SingleAnswerChart(props: SingleAnswerChartProps) {
  const {
    ["dataKey"]: dataKey,
    ["direction"]: direction,
    ["question"]: question,
    ...newProps
  } = props;
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

    return [
      {
        direction: direction,
        total: total,
        answerSet: Object.keys(result).map((k) => ({
          answerText: k,
          count: result[k].count,
          percentage: Math.round((result[k].count / total) * 100),
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
