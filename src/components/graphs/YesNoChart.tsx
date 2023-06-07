"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { Section } from "../Section/Section";
import {
  BaseChartProps,
  ChartData,
  filterRows,
} from "@/components/graphs/Common";
import _ from "lodash";

type BooleanData = ChartData<boolean>;
type Aggregation = { false: number; true: number };

export function YesNoChart(props: BaseChartProps<BooleanData>) {
  const { dataKey } = props;
  const context = useDataContext();

  const data = useMemo(() => {
    const rows = filterRows<BooleanData>(context.rows, dataKey);
    const result: Aggregation = {
      ...{ false: 0, true: 0 },
      ..._.countBy(rows),
    };

    return [
      {
        total: rows.length,
        answerSet: Object.entries(result).map(([key, val]) => ({
          answerText: key === "true" ? "Yes" : "No",
          count: val,
          percentage: Math.round((val / rows.length) * 100),
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
