"use client";

import React, { useMemo } from "react";
import { useDataContext } from "@/components/DataContext";
import { Chart } from "../Chart/Chart";
import { IDataEntry } from "@/data/types";
import { Section } from "../Section/Section";
import _ from "lodash";

interface DynamicNumberAnswerChartProps {
  dataKey: keyof IDataEntry;
  direction: "vertical" | "horizontal";
  sectionTitle?: string;
}

export function DynamicNumberAnswerChart(props: DynamicNumberAnswerChartProps) {
  const { dataKey, direction, sectionTitle } = props;

  const context = useDataContext();
  const data = useMemo(() => {
    const values = context.rows.map((x) => x[dataKey]).filter((x) => !!x);
    const counts = _.countBy(values);

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
