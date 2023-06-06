import { KeyOfType } from "@/types";

export type BaseChartProps<RowT, ColT> = {
  dataKey: KeyOfType<RowT, ColT | null | undefined>;
  direction: "vertical" | "horizontal";
  sectionTitle: string;
};

export type CategoryChartProps<RowT, ColT> = BaseChartProps<RowT, ColT> & {
  categories: { [key: string]: string };
};
