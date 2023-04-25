import React, { PropsWithChildren } from "react";
import { AgeGroup, IDataEntry } from "@/data/types";
import { loadData } from "@/data/load";

export enum IsModderFilter {
  ALL = "ALL",
  YES = "YES",
  NO = "NO",
}

export type IDataContext = {
  rows: IDataEntry[];

  setAgeGroupFilter: (val: AgeGroup[]) => void;
  ageGroupFilter: AgeGroup[];

  setIsModderFilter: (val: IsModderFilter) => void;
  isModderFilter: IsModderFilter;
};

export const DataContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [ageGroupFilter, setAgeGroupFilter] = React.useState<AgeGroup[]>([
    AgeGroup._13_18,
    AgeGroup._19_25,
    AgeGroup._26_32,
    AgeGroup._33,
    AgeGroup.UNDISCLOSED,
  ]);
  const [isModderFilter, setIsModderFilter] = React.useState<IsModderFilter>(
    IsModderFilter.ALL
  );
  const rawData = React.useMemo<IDataEntry[]>(() => {
    return loadData(1100);
  }, []);
  const filteredData = React.useMemo<IDataEntry[]>(() => {
    return rawData.filter((x) => {
      return (
        (isModderFilter == IsModderFilter.ALL ||
          (x.isModder && isModderFilter == IsModderFilter.YES) ||
          (!x.isModder && isModderFilter == IsModderFilter.NO)) &&
        ageGroupFilter.includes(x.ageGroup)
      );
    });
  }, [rawData, ageGroupFilter, isModderFilter]);

  const context: IDataContext = {
    rows: filteredData,
    setAgeGroupFilter,
    ageGroupFilter,
    setIsModderFilter,
    isModderFilter,
  };

  return (
    <DataContext.Provider value={context}>
      {props.children}
    </DataContext.Provider>
  );
};

export const DataContext = React.createContext<IDataContext>({
  rows: [],
  setAgeGroupFilter: () => undefined,
  ageGroupFilter: [
    AgeGroup._13_18,
    AgeGroup._19_25,
    AgeGroup._26_32,
    AgeGroup._33,
    AgeGroup.UNDISCLOSED,
  ],
  setIsModderFilter: () => undefined,
  isModderFilter: IsModderFilter.ALL,
});

export const useDataContext = (): IDataContext => {
  return React.useContext(DataContext);
};
