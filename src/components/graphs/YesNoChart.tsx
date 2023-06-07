"use client";

import React from "react";
import {
  BaseChartProps,
  ChartData,
  CommonChart,
  initializeCounters,
  useChart,
} from "@/components/graphs/Common";
import _ from "lodash";

type BooleanData = ChartData<boolean>;

export function YesNoChart(props: BaseChartProps<BooleanData>) {
  const chartData = useChart({
    ...props,
    aggregator: (rows) => {
      const result = {
        ...initializeCounters(["false", "true"]),
        ..._.countBy(_.flatMap(rows)),
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
