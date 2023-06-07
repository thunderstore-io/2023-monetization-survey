"use client";

import React from "react";
import _ from "lodash";
import {
  CategoryChartProps,
  CategoryData,
  CommonChart,
  useChart,
} from "@/components/graphs/Common";

export function MultipleAnswerChart(props: CategoryChartProps<CategoryData>) {
  const chartData = useChart<CategoryData>({
    ...props,
    aggregator: (rows) => {
      const aggregate = {
        ..._.transform(
          props.categories,
          (res, val) => (res[val] = 0),
          {} as { [k: string]: number }
        ),
        ..._.countBy(_.flatMap(rows)),
      };

      return _.keys(aggregate).map((key) => ({
        answerText: key,
        count: aggregate[key],
        percentage: Math.round((aggregate[key] / rows.length) * 100),
      }));
    },
  });

  return <CommonChart {...chartData} />;
}
