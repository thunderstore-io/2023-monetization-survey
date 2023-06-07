"use client";

import React from "react";
import { DynamicCategory } from "@/data/types";
import {
  BaseChartProps,
  ChartData,
  CommonChart,
  initializeCounters,
  useChart,
} from "@/components/graphs/Common";
import _ from "lodash";
import { useDataContext } from "@/components/DataContext";

type DynamicCategoryData = ChartData<DynamicCategory[]>;

export function DynamicAnswerChart(props: BaseChartProps<DynamicCategoryData>) {
  const categories = useDataContext().categories[props.dataKey];

  const chartData = useChart<DynamicCategoryData>({
    ...props,
    aggregator: (rows) => {
      const aggregate = {
        ...initializeCounters(Object.keys(categories)),
        ..._.countBy(_.flatMap(rows), "id"),
      };

      return Object.entries(aggregate).map(([id, count]) => ({
        answerText: categories[id] || id,
        count: count,
        percentage: Math.round((count / rows.length) * 100),
      }));
    },
  });

  return <CommonChart {...chartData} />;
}
