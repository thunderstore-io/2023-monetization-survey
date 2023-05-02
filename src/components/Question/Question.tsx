import styles from "./Question.module.css";
import { ReactNode } from "react";

interface QuestionProps {
  question: string;
  children: ReactNode[] | ReactNode;
}

export function Question(props: QuestionProps) {
  const { question, children } = props;
  return (
    <div className={styles.sections}>
      <div className={styles.section}>
        <div className={styles.section__header}>
          <div className={styles.section__title}>{question}</div>
        </div>
        {children}
      </div>
    </div>
  );
}
