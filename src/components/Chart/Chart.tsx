import { CSSProperties, ReactNode } from "react";
import styles from "./Chart.module.css";

interface ChartProps {
  answerGroup: {
    subQuestion?: string | number;
    total: number;
    answerSet: {
      answerText: string;
      percentage: number;
      count: number;
    }[];
    direction: string | "vertical" | "horizontal";
  }[];
  children?: ReactNode;
}

interface CustomCSS extends CSSProperties {
  "--p": number;
}

export function Chart(props: ChartProps) {
  const { answerGroup } = props;
  return (
    <>
      {Object.keys(answerGroup).map((groupK, groupID) => (
        <div
          key={groupK}
          className={`${styles["chart"]} ${
            answerGroup[groupID].direction === "vertical"
              ? styles["chart__vertical"]
              : styles["chart__horizontal"]
          }`}
        >
          <div className={styles.chart_subquestion}>
            {answerGroup[groupID].subQuestion}
          </div>
          <div className={styles.chart_total}>
            Total Responses: {answerGroup[groupID].total}
          </div>
          <div class={styles.chart_items}>
            {Object.keys(answerGroup[groupID].answerSet).map((k, i) => (
              <div
                key={groupK}
                className={styles.chart_item}
                style={
                  {
                    "--p": answerGroup[groupID].answerSet[i].percentage,
                  } as CustomCSS
                }
              >
                <div className={styles.chart_item__header}>
                  <div className={styles.chart_item__title}>
                    {answerGroup[groupID].answerSet[i].answerText}
                  </div>
                  <div className={styles.chart_item__value}>
                    <div className={styles.chart_item__count}>{answerGroup[groupID].answerSet[i].count} resp.{" "}</div>
                    <div className={styles.chart_item__percentage}>{answerGroup[groupID].answerSet[i].percentage}%</div>
                  </div>
                </div>
                <div className={styles.chart_item__bar}></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
