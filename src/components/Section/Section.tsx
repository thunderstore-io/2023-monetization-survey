import styles from "./Section.module.css";
import { ReactNode } from "react";

interface SectionProps {
  title: string;
  totalResponses: number;
  children: ReactNode[] | ReactNode;
}

export function Section(props: SectionProps) {
  const { title, totalResponses, children } = props;
  return (
    <div className={styles.section}>
      <div className={styles.section__header}>
        <div className={styles.section__title}>{title}</div>
      </div>
      {totalResponses ? (
        <div className={styles.section_totalResponses}>
          Total responses: {totalResponses}
        </div>
      ) : (
        <></>
      )}
      <div className={styles.section__body}>{children}</div>
    </div>
  );
}
