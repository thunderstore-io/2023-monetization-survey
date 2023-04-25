import styles from "./page.module.css";
import { ExampleChart } from "@/components/graphs/Example";

export default function Home() {
  return (
    <main className={styles.main}>
      <ExampleChart />
    </main>
  );
}
