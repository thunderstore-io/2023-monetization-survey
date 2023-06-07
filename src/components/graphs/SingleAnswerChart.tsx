"use client";

import React from "react";
import _ from "lodash";
import {
  CategoryChartProps,
  ChartData,
  CommonChart,
  initializeCounters,
  useChart,
} from "@/components/graphs/Common";

type StringData = ChartData<string>;

export function SingleAnswerChart(props: CategoryChartProps<StringData>) {
  const chartData = useChart<StringData>({
    ...props,
    aggregator: (rows) => {
      const counts = {
        ...initializeCounters(props.categories),
        ..._.countBy(_.flatMap(rows)),
      };

      return _.keys(counts).map((key) => ({
        answerText: key,
        count: counts[key],
        percentage: Math.round((counts[key] / rows.length) * 100),
      }));
    },
  });

  return <CommonChart {...chartData} />;
}
