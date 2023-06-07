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

type Props = BaseChartProps<NumberData> & {
  bucketSize: number;
};

export function DynamicNumberAnswerChart(props: Props) {
  const { bucketSize } = props;

  const chartData = useChart<NumberData>({
    ...props,
    orderByPercentage: false,
    aggregator: (rows) => {
      const counts = _.countBy(rows.map((x) => Math.floor(x / bucketSize)));
      return Object.entries(counts).map(([key, count], index, arr) => {
        const x = Number(key) * bucketSize;
        const y = index < arr.length - 1 ? ` - ${x + bucketSize}` : "+";
        return {
          answerText: `${x}${y}`,
          count: count,
          percentage: Math.round((count / rows.length) * 100),
        };
      });
    },
  });

  return <CommonChart {...chartData} />;
}
