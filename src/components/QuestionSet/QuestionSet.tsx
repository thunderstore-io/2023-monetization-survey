import { ReactNode } from "react";
import styles from "./QuestionSet.module.css";

interface QuestionSetProps {
  question: string;
  children: ReactNode;
}

export function QuestionSet(props: QuestionSetProps) {
  const { question, children } = props;
  return (
    <div className={styles.section}>
      <div className={styles.section__header}>
        <div className={styles.section__title}>{question}</div>
      </div>
      <div className={styles.section__body}>{children}</div>
    </div>
  );
}
