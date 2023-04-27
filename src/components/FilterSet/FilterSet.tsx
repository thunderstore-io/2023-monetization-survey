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
import styles from "./FilterSet.module.css";

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
    <div className={styles.filters}>
      <div
        className={`${styles["filters__section"]} ${styles["filters__users"]}`}
      >
        <h4 className={styles.filters__section__title}>User Groups</h4>

        <div className={styles.filters__row}>
          <ToggleGroup.Root
            className={styles.toggleGroup}
            type="single"
            defaultValue="ALL"
            value={context.isModderFilter}
            onValueChange={(value: IsModderFilter) => {
              if (value) context.setIsModderFilter(value);
            }}
            aria-label="User groups"
          >
            <ToggleGroup.Item
              className={styles.toggleGroup__item}
              value={IsModderFilter.ALL}
              aria-label="Both"
            >
              Both
            </ToggleGroup.Item>
            <ToggleGroup.Item
              className={styles.toggleGroup__item}
              value={IsModderFilter.YES}
              aria-label="Creators"
            >
              Creators
            </ToggleGroup.Item>
            <ToggleGroup.Item
              className={styles.toggleGroup__item}
              value={IsModderFilter.NO}
              aria-label="End-users"
            >
              End-users
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      </div>

      <div
        className={`${styles["filters__section"]} ${styles["filters__age"]}`}
      >
        <h4 className={styles.filters__section__title}>Age Groups</h4>

        <div className={styles.filters__row}>
          <label
            className={styles.label}
            htmlFor={`${AgeGroup._13_18}-switch`}
            style={{ paddingRight: 15 }}
          >
            {AgeGroup._13_18}
          </label>
          <Switch.Root
            className={styles.switch}
            id={`${AgeGroup._13_18}-switch`}
            checked={context.ageGroupFilter.includes(AgeGroup._13_18)}
            onClick={() => {
              toggleAgeGroupFilter({
                context: context,
                enum: AgeGroup._13_18,
              });
            }}
          ></Switch.Root>
        </div>

        <div className={styles.filters__row}>
          <label
            className={styles.label}
            htmlFor={`${AgeGroup._19_25}-switch`}
            style={{ paddingRight: 15 }}
          >
            {AgeGroup._19_25}
          </label>
          <Switch.Root
            className={styles.switch}
            id={`${AgeGroup._19_25}-switch`}
            checked={context.ageGroupFilter.includes(AgeGroup._19_25)}
            onClick={() => {
              toggleAgeGroupFilter({
                context: context,
                enum: AgeGroup._19_25,
              });
            }}
          ></Switch.Root>
        </div>

        <div className={styles.filters__row}>
          <label
            className={styles.label}
            htmlFor={`${AgeGroup._26_32}-switch`}
            style={{ paddingRight: 15 }}
          >
            {AgeGroup._26_32}
          </label>
          <Switch.Root
            className={styles.switch}
            id={`${AgeGroup._26_32}-switch`}
            checked={context.ageGroupFilter.includes(AgeGroup._26_32)}
            onClick={() => {
              toggleAgeGroupFilter({
                context: context,
                enum: AgeGroup._26_32,
              });
            }}
          ></Switch.Root>
        </div>

        <div className={styles.filters__row}>
          <label
            className={styles.label}
            htmlFor={`${AgeGroup._33}-switch`}
            style={{ paddingRight: 15 }}
          >
            {AgeGroup._33}
          </label>
          <Switch.Root
            className={styles.switch}
            id={`${AgeGroup._33}-switch`}
            checked={context.ageGroupFilter.includes(AgeGroup._33)}
            onClick={() => {
              toggleAgeGroupFilter({
                context: context,
                enum: AgeGroup._33,
              });
            }}
          ></Switch.Root>
        </div>

        <div className={styles.filters__row}>
          <label
            className={styles.label}
            htmlFor={`${AgeGroup.UNDISCLOSED}-switch`}
            style={{ paddingRight: 15 }}
          >
            {AgeGroup.UNDISCLOSED}
          </label>
          <Switch.Root
            className={styles.switch}
            id={`${AgeGroup.UNDISCLOSED}-switch`}
            checked={context.ageGroupFilter.includes(AgeGroup.UNDISCLOSED)}
            onClick={() => {
              toggleAgeGroupFilter({
                context: context,
                enum: AgeGroup.UNDISCLOSED,
              });
            }}
          ></Switch.Root>
        </div>
      </div>
    </div>
  );
}
