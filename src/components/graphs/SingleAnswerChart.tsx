"use client";

import React from "react";
import _ from "lodash";
import {
  CategoryChartProps,
  ChartData,
  CommonChart,
  useChart,
} from "@/components/graphs/Common";

type StringData = ChartData<string>;

export function SingleAnswerChart(props: CategoryChartProps<StringData>) {
  const chartData = useChart<StringData>({
    ...props,
    aggregator: (rows) => {
      const counts = {
        ..._.transform(
          props.categories,
          (res, val) => (res[val] = 0),
          {} as { [k: string]: number }
        ),
        ..._.countBy(rows),
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
