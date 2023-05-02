import styles from "./Question.module.css";
import { ReactNode } from "react";

interface QuestionProps {
  question: string;
  children: ReactNode[] | ReactNode;
}

export function Question(props: QuestionProps) {
  const { question, children } = props;
  return (
    <div className={styles.question}>
      <div className={styles.question__header}>
        <div className={styles.question__title}>{question}</div>
      </div>
      <div className={styles.question__body}>{children}</div>
    </div>
  );
}
