"use client";

import styles from "./page.module.css";
import { DataContextProvider } from "@/components/DataContext";
import { FilterSet } from "@/components/FilterSet/FilterSet";
import { MultipleAnswerChart } from "@/components/graphs/MultipleAnswerChart";
import { SingleAnswerChart } from "@/components/graphs/SingleAnswerChart";
import { YesNoChart } from "@/components/graphs/YesNoChart";
import {
  AgeGroup,
  CreatorSupport,
  DonateUnwillingnessReason,
  ModdingPlatform,
  ModdingProfessionReply,
  MonetizationModels,
  PaymentSize,
  SubscriptionFeatures,
} from "@/data/types";

export default function Home() {
  return (
    <DataContextProvider>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <h3>Filters</h3>
          <FilterSet />
          <button className={styles.sidebar__toggle}>a</button>
        </aside>

        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.sections}>
              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    Are you a mod creator?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <AreYouModCreatorChart />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    Are you a mod creator?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <AreYouModCreatorChart />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    Are you a mod creator?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <AreYouModCreatorChart />
                </div>
              </div>
            </div>

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
              Recurring payments: How much have you donated per month on
              average?
            </h1>
            <AreYouModCreatorChart />
            <br />
            <h1>How much would you be willing to donate per month?</h1>
            <AreYouModCreatorChart />
            <br />
            <h1>
              Why did you choose &quot;No&quot; for supporting mod creators?
            </h1>
            <AreYouModCreatorChart />
            <br />
            <h1>
              If it was possible, would you like to create mods as a profession?
            </h1>
            <AreYouModCreatorChart />
            <br />
            <h1>
              Which of the following monetization models do you consider
              acceptable?
            </h1>
            <AreYouModCreatorChart />
            <br />
            <h1>How would you prefer a premium subscription to look like?</h1>
            <br />
            <h3>No ads</h3>
            <AreYouModCreatorChart />
            <h3>
              Exclusive customization options (e.g. an animated avatar, a
              special badge...)
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
              If a premium subscription could be used to support mod creators
              and tool development, would you consider purchasing one?
            </h1>
            <AreYouModCreatorChart />
            <br />
            <h1>One last question! How old are you?</h1>
            <AreYouModCreatorChart />
          </div>
        </main>
      </div>
    </DataContextProvider>
  );
}
