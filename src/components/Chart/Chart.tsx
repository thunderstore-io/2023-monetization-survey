import { CSSProperties, ReactNode } from "react";
import styles from "./Chart.module.css";

interface ChartProps {
  answerGroup: {
    subQuestion?: string | number;
    answerSet: { answerText: string; percentage: number }[];
    direction: string | "vertical" | "horizontal";
  }[];
  children?: ReactNode;
}

interface CustomCSS extends CSSProperties {
  "--p": number;
}

export function Chart(props: ChartProps) {
  const { answerGroup, children } = props;
  return (
    <div className={styles.section__body}>
      {Object.keys(answerGroup).map((groupK, groupID) => (
        <div
          key={groupK}
          className={`${styles["chart"]} ${
            answerGroup[groupID].direction === "vertical"
              ? styles["chart__vertical"]
              : styles["chart__horizontal"]
          }`}
        >
          {answerGroup[groupID].subQuestion}
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
                  {answerGroup[groupID].answerSet[i].percentage}%
                </div>
              </div>
              <div className={styles.chart_item__bar}></div>
            </div>
          ))}
        </div>
      ))}
      <div className={styles.section__footer}>{children}</div>
    </div>
  );
}
