"use client";

import styles from "./page.module.css";
import { ExampleChart } from "@/components/graphs/Example";
import { DataContextProvider } from "@/components/DataContext";

export default function Home() {
  return (
    <DataContextProvider>
      <main className={styles.main}>
        <ExampleChart />
      </main>
    </DataContextProvider>
  );
}
