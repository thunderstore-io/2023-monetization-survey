"use client";

import React from "react";
import _ from "lodash";
import {
  BaseChartProps,
  ChartData,
  CommonChart,
  useChart,
} from "@/components/graphs/Common";

type NumberData = ChartData<number>;

export function DynamicNumberAnswerChart(props: BaseChartProps<NumberData>) {
  const chartData = useChart<NumberData>({
    ...props,
    aggregator: (rows) => {
      const counts = _.countBy(rows);
      return _.keys(counts).map((key) => ({
        answerText: key,
        count: counts[key],
        percentage: Math.round((counts[key] / rows.length) * 100),
      }));
    },
  });

  return <CommonChart {...chartData} />;
}
