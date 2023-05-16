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
  orderByPercentage?: boolean;
  children?: ReactNode;
}

interface CustomCSS extends CSSProperties {
  "--p": number;
}

export function Chart(props: ChartProps) {
  const { answerGroups, orderByPercentage = true } = props;
  return (
    <>
      {Object.keys(answerGroups).map((groupK, groupID) => {
        return answerGroups[groupID].total > 0 ? (
          <div
            key={groupK}
            className={`${styles["root"]} ${
              answerGroups[groupID].direction === "vertical"
                ? styles["vertical"]
                : styles["horizontal"]
            }`}
          >
            <div className={styles.subquestion}>
              {answerGroups[groupID].subQuestion}
            </div>
            <div className={styles.items}>
              {Object.keys(
                orderByPercentage
                  ? answerGroups[groupID].answerSet.sort(
                      (a, b) => b.count - a.count
                    )
                  : answerGroups[groupID].answerSet
              ).map((k, i) => (
                <div
                  key={`${groupK}_${answerGroups[groupID].answerSet[i].answerText}`}
                  className={styles.item}
                  style={
                    {
                      "--p": answerGroups[groupID].answerSet[i].percentage,
                    } as CustomCSS
                  }
                >
                  <div className={styles.item__header}>
                    <div className={styles.item__title}>
                      {answerGroups[groupID].answerSet[i].answerText}
                    </div>
                    <div className={styles.item__value}>
                      <div className={styles.item__count}>
                        {answerGroups[groupID].answerSet[i].count} resp.{" "}
                      </div>
                      <div className={styles.item__percentage}>
                        {answerGroups[groupID].answerSet[i].percentage}%
                      </div>
                    </div>
                  </div>
                  <div className={styles.item__bar}></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div key={groupK} className={styles.empty}>
            No responses with the selected filters
          </div>
        );
      })}
    </>
  );
}
