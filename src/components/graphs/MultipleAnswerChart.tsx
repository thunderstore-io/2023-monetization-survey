"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { IDataEntry } from "@/data/types";
import { Section } from "../Section/Section";
import _ from "lodash";

interface MultipleAnswerChartProps {
  dataKey: keyof IDataEntry;
  direction: "vertical" | "horizontal";
  sectionTitle?: string;
  categories: { [key: string]: string };
}

export function MultipleAnswerChart(props: MultipleAnswerChartProps) {
  const { dataKey, direction, sectionTitle, categories } = props;

  const context = useDataContext();
  const data = useMemo(() => {
    const values = context.rows.map((x) => x[dataKey]).filter((x) => !!x);
    const counts = {
      ..._.transform(
        categories,
        (res, val) => (res[val] = 0),
        {} as { [k: string]: number }
      ),
      ..._.countBy(_.flatMap(values)),
    };

    return [
      {
        direction: direction,
        total: values.length,
        answerSet: _.keys(counts).map((key) => ({
          answerText: key,
          count: counts[key],
          percentage: Math.round((counts[key] / values.length) * 100),
        })),
      },
    ];
  }, [context.rows]);

  if (sectionTitle) {
    return (
      <Section title={sectionTitle} totalResponses={data[0].total}>
        <Chart answerGroups={data}></Chart>
      </Section>
    );
  } else {
    return <Chart answerGroups={data}></Chart>;
  }
}
