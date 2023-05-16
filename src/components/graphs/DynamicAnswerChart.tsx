"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { IDataEntry } from "@/data/types";
import { Section } from "../Section/Section";

interface DynamicAnswerChartProps {
  dataKey: keyof IDataEntry;
  direction?: string | "vertical" | "horizontal";
  sectionTitle?: string;
}

export function DynamicAnswerChart(props: DynamicAnswerChartProps) {
  const {
    ["dataKey"]: dataKey,
    ["direction"]: direction,
    ["sectionTitle"]: sectionTitle,
  } = props;
  const context = useDataContext();
  const data = useMemo(() => {
    const result: {
      [key: string]: { description: string; count: number };
    } = {};
    let total = 0;
    for (const entry of context.rows) {
      if (!entry[dataKey]) continue;
      for (const categoryEntry of entry[dataKey]) {
        if (!result[categoryEntry.id]) {
          result[categoryEntry.id] = {
            description: categoryEntry.description,
            count: 1,
          };
        } else {
          result[categoryEntry.id].count += 1;
        }
      }
      total += 1;
    }

    return [
      {
        direction: direction,
        total: total,
        answerSet: Object.keys(result).map((k) => ({
          answerText: result[k].description,
          count: result[k].count,
          percentage: Math.round((result[k].count / total) * 100),
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
