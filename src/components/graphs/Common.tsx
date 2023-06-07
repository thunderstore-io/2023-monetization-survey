import { IsSet } from "@/utils";
import { IDataEntry } from "@/data/types";
import { KeyOfType } from "@/types";
import { useDataContext } from "@/components/DataContext";
import React, { useMemo } from "react";
import {
  Chart,
  ChartAnswerSet,
  ChartDirection,
  ChartProps,
} from "@/components/Chart/Chart";
import { Section, SectionProps } from "@/components/Section/Section";
import _ from "lodash";

type BaseChartTypes<RowT, ColT, Key extends keyof RowT> = {
  row: RowT;
  col: ColT & Exclude<RowT[Key], [null, undefined]>;
  key: Key;
};
type ChartTypesAny = BaseChartTypes<any, any, any>;

type BaseChartData<RowT, ColT> = BaseChartTypes<
  RowT,
  ColT,
  KeyOfType<RowT, ColT | null | undefined>
>;
export type ChartData<ColT> = BaseChartData<IDataEntry, ColT>;

export type CategoryData = ChartData<string[]>;

export type BaseChartProps<T extends ChartTypesAny> = {
  dataKey: T["key"];
  direction?: ChartDirection;
  sectionTitle: string;
};

export type CategoryChartProps<T extends ChartTypesAny> = BaseChartProps<T> & {
  categories: { [key: string]: string };
};

export function filterRows<T extends ChartTypesAny = never>(
  rows: T["row"][],
  key: T["key"]
): T["col"][] {
  return rows.map((x) => x[key]).filter(IsSet);
}

export type ChartAggregator<TRow> = (rows: TRow[]) => ChartAnswerSet;

export type UseChartDataProps<T extends ChartData<any>> = {
  dataKey: T["key"];
  direction?: ChartDirection;
  sectionTitle: string;
  aggregator: ChartAggregator<T["col"]>;
  orderByPercentage?: boolean;
};

export function useChart<T extends ChartData<any>>(
  props: UseChartDataProps<T>
): CommonChartProps {
  const context = useDataContext();
  const [responseCount, results] = useMemo(() => {
    const values = filterRows<T>(context.rows, props.dataKey);
    const results = props.aggregator(values);

    return [
      values.length,
      [
        {
          direction: props.direction,
          total: values.length,
          answerSet: results,
        },
      ],
    ];
  }, [context.rows]);

  return {
    section: {
      totalResponses: responseCount,
      title: props.sectionTitle,
    },
    chart: {
      orderByPercentage: props.orderByPercentage,
      answerGroups: results,
    },
  };
}

export function initializeCounters(
  categories: string[] | { [key: string]: string }
) {
  return _.transform(
    categories,
    (res, val) => (res[val as string] = 0),
    {} as { [k: string]: number }
  );
}

export type CommonChartProps = {
  section: Omit<SectionProps, "children">;
  chart: ChartProps;
};

export function CommonChart(props: CommonChartProps) {
  return (
    <Section {...props.section}>
      <Chart {...props.chart} />
    </Section>
  );
}
