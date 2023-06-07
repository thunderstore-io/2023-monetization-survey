"use client";

import React from "react";
import { DynamicCategory } from "@/data/types";
import {
  BaseChartProps,
  ChartData,
  CommonChart,
  useChart,
} from "@/components/graphs/Common";

type DynamicCategoryData = ChartData<DynamicCategory[]>;

export function DynamicAnswerChart(props: BaseChartProps<DynamicCategoryData>) {
  const chartData = useChart<DynamicCategoryData>({
    ...props,
    aggregator: (rows) => {
      const result: {
        [key: string]: { description: string; count: number };
      } = {};

      for (const row of rows) {
        for (const categoryEntry of row) {
          if (!result[categoryEntry.id]) {
            result[categoryEntry.id] = {
              description: categoryEntry.description,
              count: 1,
            };
          } else {
            result[categoryEntry.id].count += 1;
          }
        }
      }

      return Object.keys(result).map((k) => ({
        answerText: result[k].description,
        count: result[k].count,
        percentage: Math.round((result[k].count / rows.length) * 100),
      }));
    },
  });

  return <CommonChart {...chartData} />;
}
