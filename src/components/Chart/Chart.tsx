import { CSSProperties, ReactNode } from "react";
import styles from "./Chart.module.css";

interface ChartProps {
  answerGroups: {
    subQuestion?: string | number;
    total: number;
    answerSet: {
      answerText: string;
      percentage: number;
      count: number;
    }[];
    direction: string | "vertical" | "horizontal";
  }[];
  totalOverride?: number;
  orderByPercentage?: boolean;
  children?: ReactNode;
}

interface CustomCSS extends CSSProperties {
  "--p": number;
}

export function Chart(props: ChartProps) {
  const { answerGroups, totalOverride, orderByPercentage = true } = props;
  return (
    <>
      {totalOverride ? (
        <div className={styles.chart_total}>
          Total Responses: {totalOverride}
        </div>
      ) : (
        <></>
      )}
      {Object.keys(answerGroups).map((groupK, groupID) => {
        return answerGroups[groupID].total > 0 ? (
          <div
            key={groupK}
            className={`${styles["chart"]} ${
              answerGroups[groupID].direction === "vertical"
                ? styles["chart__vertical"]
                : styles["chart__horizontal"]
            }`}
          >
            <div className={styles.chart_subquestion}>
              {answerGroups[groupID].subQuestion}
            </div>
            {!totalOverride ? (
              <div className={styles.chart_total}>
                Total Responses: {answerGroups[groupID].total}
              </div>
            ) : (
              <></>
            )}
            <div className={styles.chart_items}>
              {Object.keys(
                orderByPercentage
                  ? answerGroups[groupID].answerSet.sort(
                      (a, b) => b.count - a.count
                    )
                  : answerGroups[groupID].answerSet
              ).map((k, i) => (
                <div
                  key={`${groupK}_${answerGroups[groupID].answerSet[i].answerText}`}
                  className={styles.chart_item}
                  style={
                    {
                      "--p": answerGroups[groupID].answerSet[i].percentage,
                    } as CustomCSS
                  }
                >
                  <div className={styles.chart_item__header}>
                    <div className={styles.chart_item__title}>
                      {answerGroups[groupID].answerSet[i].answerText}
                    </div>
                    <div className={styles.chart_item__value}>
                      <div className={styles.chart_item__count}>
                        {answerGroups[groupID].answerSet[i].count} resp.{" "}
                      </div>
                      <div className={styles.chart_item__percentage}>
                        {answerGroups[groupID].answerSet[i].percentage}%
                      </div>
                    </div>
                  </div>
                  <div className={styles.chart_item__bar}></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div key={groupK} className={styles.chart_empty}>
            No responses with the selected filters
          </div>
        );
      })}
    </>
  );
}
