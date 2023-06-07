import { IsSet } from "@/utils";
import { IDataEntry } from "@/data/types";
import { KeyOfType } from "@/types";

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
  direction: "vertical" | "horizontal";
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
