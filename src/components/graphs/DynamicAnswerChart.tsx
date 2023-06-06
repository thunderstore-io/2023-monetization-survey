"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { DynamicCategory, IDataEntry } from "@/data/types";
import { Section } from "../Section/Section";
import { BaseChartProps } from "@/components/graphs/Common";
import { NotUnset } from "@/utils";

export function DynamicAnswerChart(
  props: BaseChartProps<IDataEntry, DynamicCategory[]>
) {
  const { dataKey, direction, sectionTitle } = props;
  const context = useDataContext();

  const data = useMemo(() => {
    const rows = context.rows.map((x) => x[dataKey]).filter(NotUnset);

    const result: {
      [key: string]: { description: string; count: number };
    } = {};

    for (const row of rows) {
      for (const categoryEntry of row) {
        if (!result[categoryEntry.id]) {
          result[categoryEntry.id] = {
            description: categoryEntry.description,
            count: 1,
          };
        } else {
          result[categoryEntry.id].count += 1;
        }
      }
    }

    return [
      {
        direction: direction,
        total: rows.length,
        answerSet: Object.keys(result).map((k) => ({
          answerText: result[k].description,
          count: result[k].count,
          percentage: Math.round((result[k].count / rows.length) * 100),
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
