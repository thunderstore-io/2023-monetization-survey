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
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.total}>
          Total responses: {totalResponses || 0}
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
