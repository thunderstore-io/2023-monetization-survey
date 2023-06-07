"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { Section } from "../Section/Section";
import _ from "lodash";
import {
  BaseChartProps,
  CategoryData,
  filterRows,
} from "@/components/graphs/Common";

export function OrderedMultipleAnswerChart(
  props: BaseChartProps<CategoryData>
) {
  const { dataKey, direction, sectionTitle } = props;
  const context = useDataContext();
  const data = useMemo(() => {
    const rows = filterRows<CategoryData>(context.rows, dataKey);
    const features = rows[0];
    if (!features) return [];

    const result = _.transform(
      rows,
      (result, row) => {
        row.map((feature, ranking) => {
          result[feature][ranking] += 1;
        });
      },
      Object.fromEntries(
        features.map((x) => [x, Array(features.length).fill(0)])
      )
    );

    return Object.keys(result).map((feature) => ({
      direction: direction,
      subQuestion: feature,
      total: rows.length,
      answerSet: result[feature].map((count, index) => ({
        answerText: Number(index) + 1,
        count: count,
        percentage: Math.round((count / rows.length) * 100),
      })),
    }));
  }, [context.rows]);

  if (sectionTitle) {
    return (
      <Section title={sectionTitle} totalResponses={data[0].total}>
        <Chart answerGroups={data} orderByPercentage={false}></Chart>
      </Section>
    );
  } else {
    return <Chart answerGroups={data} orderByPercentage={false}></Chart>;
  }
}
