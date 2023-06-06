"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { Section } from "../Section/Section";
import { IDataEntry } from "@/data/types";
import { BaseChartProps } from "@/components/graphs/Common";

export function YesNoChart(props: BaseChartProps<IDataEntry, boolean>) {
  const context = useDataContext();
  const data = useMemo(() => {
    let total = 0;
    const result: { [key: string]: { count: number } } = {
      yes: { count: 0 },
      no: { count: 0 },
    };
    for (const entry of context.rows) {
      if (entry[props.dataKey] === true) {
        result["yes"].count += 1;
      } else if (entry[props.dataKey] === false) {
        result["no"].count += 1;
      } else {
        continue;
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
        direction: props.direction,
      },
    ];
  }, [context.rows]);

  if (props.sectionTitle) {
    return (
      <Section title={props.sectionTitle} totalResponses={data[0].total}>
        <Chart answerGroups={data}></Chart>
      </Section>
    );
  } else {
    return <Chart answerGroups={data}></Chart>;
  }
}
