import React, { PropsWithChildren } from "react";
import { IDataEntry } from "@/data/types";
import { loadData } from "@/data/load";

export enum AgeGroupFilter {
  ALL,
}

export enum IsModderFilter {
  ALL,
  YES,
  NO,
}

export type IDataContext = {
  rows: IDataEntry[];

  setAgeGroupFilter: (val: AgeGroupFilter) => void;
  ageGroupFilter: AgeGroupFilter;

  setIsModderFilter: (val: IsModderFilter) => void;
  isModderFilter: IsModderFilter;
};

export const DataContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [ageGroupFilter, setAgeGroupFilter] = React.useState<AgeGroupFilter>(
    AgeGroupFilter.ALL
  );
  const [isModderFilter, setIsModderFilter] = React.useState<IsModderFilter>(
    IsModderFilter.ALL
  );
  const rawData = React.useMemo<IDataEntry[]>(() => {
    return loadData(1100);
  }, []);

  const context: IDataContext = {
    rows: rawData,
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
  ageGroupFilter: AgeGroupFilter.ALL,
  setIsModderFilter: () => undefined,
  isModderFilter: IsModderFilter.ALL,
});

export const useDataContext = (): IDataContext => {
  return React.useContext(DataContext);
};
