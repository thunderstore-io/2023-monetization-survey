import { Logo } from "@/components/Logo/Logo";
import styles from "./Header.module.css";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Logo />
      </div>
      <div className={styles.header__title}>
        Modding platform monetization questionnaire 2023
      </div>
    </header>
  );
};
