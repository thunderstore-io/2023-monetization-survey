"use client";

import React from "react";
import {
  BaseChartProps,
  ChartData,
  CommonChart,
  useChart,
} from "@/components/graphs/Common";
import _ from "lodash";

type BooleanData = ChartData<boolean>;
type Aggregation = { false: number; true: number };

export function YesNoChart(props: BaseChartProps<BooleanData>) {
  const chartData = useChart({
    ...props,
    aggregator: (rows) => {
      const result: Aggregation = {
        ...{ false: 0, true: 0 },
        ..._.countBy(rows),
      };

      return Object.entries(result).map(([key, val]) => ({
        answerText: key === "true" ? "Yes" : "No",
        count: val,
        percentage: Math.round((val / rows.length) * 100),
      }));
    },
  });

  return <CommonChart {...chartData} />;
}
