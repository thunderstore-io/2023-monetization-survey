"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { IDataEntry } from "@/data/types";
import { Section } from "../Section/Section";

interface MultipleAnswerChartProps {
  dataKey: keyof IDataEntry;
  direction?: string | "vertical" | "horizontal";
  sectionTitle?: string;
}

export function MultipleAnswerChart(props: MultipleAnswerChartProps) {
  const {
    ["dataKey"]: dataKey,
    ["direction"]: direction,
    ["sectionTitle"]: sectionTitle,
    ...newProps
  } = props;
  const context = useDataContext();
  const data = useMemo(() => {
    const result: {
      answers: { [key: `string${string}`]: number };
      total: number;
    } = { total: 0, answers: {} };

    // Initialize object
    Object.keys(newProps).map((k) => {
      result["answers"][newProps[k]] = 0;
    });

    // Count stuff
    for (const entry of context.rows) {
      if (!entry[dataKey]) continue;
      Object.keys(entry[dataKey]).map((k) => {
        result["answers"][entry[dataKey][k]] += 1;
        result.total += 1;
      });
    }

    return [
      {
        direction: direction,
        total: result.total,
        answerSet: Object.keys(result["answers"]).map((answerK) => ({
          answerText: answerK,
          count: result["answers"][answerK],
          percentage: Math.round(
            (result["answers"][answerK] / result.total) * 100
          ),
        })),
      },
    ];
  }, [context.rows]);

  if (sectionTitle) {
    return (
      <Section title={sectionTitle} totalResponses={data[0].total}>
        <Chart answerGroups={data}></Chart>
      </Section>
    );
  } else {
    return <Chart answerGroups={data}></Chart>;
  }
}
