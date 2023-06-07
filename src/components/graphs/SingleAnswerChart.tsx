"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { Section } from "../Section/Section";
import _ from "lodash";
import {
  CategoryChartProps,
  ChartData,
  filterRows,
} from "@/components/graphs/Common";

type StringData = ChartData<string>;

export function SingleAnswerChart(props: CategoryChartProps<StringData>) {
  const { dataKey, direction, sectionTitle, categories } = props;

  const context = useDataContext();
  const data = useMemo(() => {
    const values = filterRows<StringData>(context.rows, dataKey);

    const counts = {
      ..._.transform(
        categories,
        (res, val) => (res[val] = 0),
        {} as { [k: string]: number }
      ),
      ..._.countBy(values),
    };

    return [
      {
        direction: direction,
        total: values.length,
        answerSet: _.keys(counts).map((key) => ({
          answerText: key,
          count: counts[key],
          percentage: Math.round((counts[key] / values.length) * 100),
        })),
      },
    ];
  }, [context.rows]);

  return (
    <Section title={sectionTitle} totalResponses={data[0].total}>
      <Chart answerGroups={data}></Chart>
    </Section>
  );
}
