"use client";

import styles from "./page.module.css";
import { DataContextProvider } from "@/components/DataContext";
import { FilterSet } from "@/components/FilterSet/FilterSet";
import { AreYouModCreatorChart } from "@/components/graphs/AreYouModCreator";

export default function Home() {
  return (
    <DataContextProvider>
      <main className={styles.main}>
        <FilterSet />
        <h1>Are you a mod creator?</h1>
        <AreYouModCreatorChart />
        <br />
        <h1>Which platforms do you use as a mod creator?</h1>
        <AreYouModCreatorChart />
        <br />
        <h1>Which platforms do you use as an end-user?</h1>
        <AreYouModCreatorChart />
        <br />
        <h1>Have you supported mod creators directly?</h1>
        <AreYouModCreatorChart />
        <br />
        <h1>
          One-off payments: How much have you donated per month on average?
        </h1>
        <AreYouModCreatorChart />
        <br />
        <h1>
          Recurring payments: How much have you donated per month on average?
        </h1>
        <AreYouModCreatorChart />
        <br />
        <h1>How much would you be willing to donate per month?</h1>
        <AreYouModCreatorChart />
        <br />
        <h1>
          Why did you choose &quot;_____&quot; for supporting mod creators?
        </h1>
        <AreYouModCreatorChart />
        <br />
        <h1>
          If it was possible, would you like to create mods as a profession?
        </h1>
        <AreYouModCreatorChart />
        <br />
        <h1>
          Which of the following monetization models do you consider acceptable?
        </h1>
        <AreYouModCreatorChart />
        <br />
        <h1>How would you prefer a premium subscription to look like?</h1>
        <br />
        <h3>No ads</h3>
        <AreYouModCreatorChart />
        <h3>
          Exclusive customization options (e.g. an animated avatar, a special
          badge...)
        </h3>
        <AreYouModCreatorChart />
        <h3>Exclusive QoL features</h3>
        <AreYouModCreatorChart />
        <h3>Unlimited download speed (free users throttled)</h3>
        <AreYouModCreatorChart />
        <h3>Early access to new platform features</h3>
        <AreYouModCreatorChart />
        <h3>Early access to mods (mod creator controls)</h3>
        <AreYouModCreatorChart />
        <h3>Premium mods (one subscription to access all)</h3>
        <AreYouModCreatorChart />
        <h3>Supporting mod creators</h3>
        <AreYouModCreatorChart />
        <h3>Supporting the platform</h3>
        <AreYouModCreatorChart />
        <br />
        <h1>
          If a premium subscription could be used to support mod creators and
          tool development, would you consider purchasing one?
        </h1>
        <AreYouModCreatorChart />
        <br />
        <h1>One last question! How old are you?</h1>
        <AreYouModCreatorChart />
      </main>
    </DataContextProvider>
  );
}
