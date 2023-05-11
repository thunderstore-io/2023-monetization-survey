"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { IDataEntry } from "@/data/types";

interface OrderedMultipleAnswerChartProps {
  dataKey: keyof IDataEntry;
  direction?: string | "vertical" | "horizontal";
}

export function OrderedMultipleAnswerChart(
  props: OrderedMultipleAnswerChartProps
) {
  const { ["dataKey"]: dataKey, ["direction"]: direction, ...newProps } = props;
  const context = useDataContext();
  const data = useMemo(() => {
    const result: {
      [key: `string${string}`]: {
        orderedCount: { [key: number]: number };
        total: number;
      };
    } = {};

    // Count stuff
    for (const entry of context.rows) {
      if (!entry[dataKey]) continue;
      Object.keys(entry[dataKey]).map((featureEntry, index: number) => {
        if (!result[entry[dataKey][featureEntry]]) {
          result[entry[dataKey][featureEntry]] = { orderedCount: {}, total: 0 };
          result[entry[dataKey][featureEntry]]["orderedCount"][index] = 1;
        } else {
          if (!result[entry[dataKey][featureEntry]]["orderedCount"][index]) {
            result[entry[dataKey][featureEntry]]["orderedCount"][index] = 1;
          } else {
            result[entry[dataKey][featureEntry]]["orderedCount"][index] += 1;
          }
        }
        result[entry[dataKey][featureEntry]]["total"] += 1;
      });
    }

    return Object.keys(result).map((k) => ({
      direction: direction,
      subQuestion: k,
      total: result[k].total,
      answerSet: Object.keys(result[k]["orderedCount"]).map((orderNumber) => ({
        answerText: Number(orderNumber) + 1,
        count: result[k]["orderedCount"][orderNumber],
        percentage: Math.round(
          (result[k]["orderedCount"][orderNumber] / result[k].total) * 100
        ),
      })),
    }));
  }, [context.rows]);

  return <Chart answerGroup={data}></Chart>;
}
