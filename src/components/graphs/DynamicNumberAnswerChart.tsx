"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { Section } from "../Section/Section";
import _ from "lodash";
import {
  BaseChartProps,
  ChartData,
  filterRows,
} from "@/components/graphs/Common";

type NumberData = ChartData<number>;

export function DynamicNumberAnswerChart(props: BaseChartProps<NumberData>) {
  const { dataKey, direction, sectionTitle } = props;

  const context = useDataContext();
  const data = useMemo(() => {
    const values = filterRows<NumberData>(context.rows, dataKey);
    const counts = _.countBy(values);

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
