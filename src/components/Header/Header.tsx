import { Logo } from "@/components/Logo/Logo";
import styles from "./header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Logo />
      </div>
      <div className={styles.header__title}>Modding platform monetisation questionnaire 2023</div>

      {/* Alt filter toggle button */}
      {/*<div className={styles.header__actions}>
        <button className={styles.header__toggle}>
          Filters
        </button>
      </div>*/}
    </header>
  );
}