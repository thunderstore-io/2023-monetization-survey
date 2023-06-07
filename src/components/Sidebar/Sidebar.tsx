"use client";

import styles from "@/app/page.module.css";
import { FilterSet } from "@/components/FilterSet/FilterSet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";

export const Sidebar = () => {
  const [sidebarActive, toggleSidebar] = useState(false);

  return (
    <aside
      className={`${styles.sidebar} ${sidebarActive ? styles.is_active : null}`}
    >
      <ul className={styles.links}>
        <li className={styles.link}>
          <Link href="/results.json">Download raw data</Link>
        </li>
        <li className={styles.link}>
          <Link
            href="https://github.com/thunderstore-io/2023-monetization-survey"
            target="_blank"
          >
            View source on GitHub
          </Link>
        </li>
      </ul>
      <h3>Filters</h3>
      <FilterSet />
      <button
        className={styles.sidebar__toggle}
        onClick={() => toggleSidebar(!sidebarActive)}
        title={sidebarActive ? "Hide filters" : "Show filters"}
      >
        <FontAwesomeIcon
          aria-hidden
          className="icon"
          icon={sidebarActive ? faXmark : faSliders}
        />
      </button>
    </aside>
  );
};
