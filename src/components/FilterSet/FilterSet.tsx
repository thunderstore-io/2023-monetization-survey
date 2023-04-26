"use client";

import React from "react";
import {
  IDataContext,
  IsModderFilter,
  useDataContext,
} from "@/components/DataContext";
import { AgeGroup } from "@/data/types";
import * as Switch from "@radix-ui/react-switch";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import "./styles.css";

interface toggleAgeGroupFilterProps {
  context: IDataContext;
  enum: AgeGroup;
}

function toggleAgeGroupFilter(props: toggleAgeGroupFilterProps) {
  if (props.context.ageGroupFilter.includes(props.enum)) {
    props.context.setAgeGroupFilter(
      props.context.ageGroupFilter.filter((x: AgeGroup) => x !== props.enum)
    );
  } else {
    props.context.setAgeGroupFilter([
      ...props.context.ageGroupFilter,
      props.enum,
    ]);
  }
}

export function FilterSet() {
  const context = useDataContext();
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ToggleGroup.Root
          className="ToggleGroup"
          type="single"
          defaultValue="ALL"
          value={context.isModderFilter}
          onValueChange={(value: IsModderFilter) => {
            if (value) context.setIsModderFilter(value);
          }}
          aria-label="Is modder"
        >
          <ToggleGroup.Item
            className="ToggleGroupItem"
            value={IsModderFilter.ALL}
            aria-label="ALL"
          >
            ALL
          </ToggleGroup.Item>
          <ToggleGroup.Item
            className="ToggleGroupItem"
            value={IsModderFilter.YES}
            aria-label="Yes"
          >
            YES
          </ToggleGroup.Item>
          <ToggleGroup.Item
            className="ToggleGroupItem"
            value={IsModderFilter.NO}
            aria-label="No"
          >
            NO
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <label
          className="Label"
          htmlFor={`${AgeGroup._13_18}-switch`}
          style={{ paddingRight: 15 }}
        >
          {AgeGroup._13_18}
        </label>
        <Switch.Root
          className="SwitchRoot"
          id={`${AgeGroup._13_18}-switch`}
          asChild={true}
          checked={context.ageGroupFilter.includes(AgeGroup._13_18)}
        >
          <button
            className="SwitchThumb"
            onClick={() => {
              toggleAgeGroupFilter({
                context: context,
                enum: AgeGroup._13_18,
              });
            }}
          ></button>
        </Switch.Root>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <label
          className="Label"
          htmlFor={`${AgeGroup._19_25}-switch`}
          style={{ paddingRight: 15 }}
        >
          {AgeGroup._19_25}
        </label>
        <Switch.Root
          className="SwitchRoot"
          id={`${AgeGroup._19_25}-switch`}
          asChild={true}
          checked={context.ageGroupFilter.includes(AgeGroup._19_25)}
        >
          <button
            className="SwitchThumb"
            onClick={() => {
              toggleAgeGroupFilter({
                context: context,
                enum: AgeGroup._19_25,
              });
            }}
          ></button>
        </Switch.Root>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <label
          className="Label"
          htmlFor={`${AgeGroup._26_32}-switch`}
          style={{ paddingRight: 15 }}
        >
          {AgeGroup._26_32}
        </label>
        <Switch.Root
          className="SwitchRoot"
          id={`${AgeGroup._26_32}-switch`}
          asChild={true}
          checked={context.ageGroupFilter.includes(AgeGroup._26_32)}
        >
          <button
            className="SwitchThumb"
            onClick={() => {
              toggleAgeGroupFilter({
                context: context,
                enum: AgeGroup._26_32,
              });
            }}
          ></button>
        </Switch.Root>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <label
          className="Label"
          htmlFor={`${AgeGroup._33}-switch`}
          style={{ paddingRight: 15 }}
        >
          {AgeGroup._33}
        </label>
        <Switch.Root
          className="SwitchRoot"
          id={`${AgeGroup._33}-switch`}
          asChild={true}
          checked={context.ageGroupFilter.includes(AgeGroup._33)}
        >
          <button
            className="SwitchThumb"
            onClick={() => {
              toggleAgeGroupFilter({
                context: context,
                enum: AgeGroup._33,
              });
            }}
          ></button>
        </Switch.Root>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <label
          className="Label"
          htmlFor={`${AgeGroup.UNDISCLOSED}-switch`}
          style={{ paddingRight: 15 }}
        >
          {AgeGroup.UNDISCLOSED}
        </label>
        <Switch.Root
          className="SwitchRoot"
          id={`${AgeGroup.UNDISCLOSED}-switch`}
          asChild={true}
          checked={context.ageGroupFilter.includes(AgeGroup.UNDISCLOSED)}
        >
          <button
            className="SwitchThumb"
            onClick={() => {
              toggleAgeGroupFilter({
                context: context,
                enum: AgeGroup.UNDISCLOSED,
              });
            }}
          ></button>
        </Switch.Root>
      </div>
    </div>
  );
}
