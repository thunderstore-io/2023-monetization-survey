"use client";

import styles from "./page.module.css";
import { faSliders, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { useState } from "react";

export default function Home() {
  const [sidebarActive, toggleSidebar] = useState(false);

  return (
    <DataContextProvider>
      <div className={styles.content}>
        <aside
          className={`${styles["sidebar"]} ${
            sidebarActive ? styles["is-active"] : null
          }`}
        >
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
                  <YesNoChart dataKey="isModder" />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    Which platforms do you use as a mod creator?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <MultipleAnswerChart
                    {...ModdingPlatform}
                    dataKey="platformsUsedAsModder"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    Which platforms do you use as an end-user?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <MultipleAnswerChart
                    {...ModdingPlatform}
                    dataKey="platformsUsedAsUser"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    Have you supported mod creators directly?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <SingleAnswerChart
                    {...CreatorSupport}
                    dataKey="hasSupportedCreators"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    One-off payments: How much have you donated per month on
                    average?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <SingleAnswerChart
                    {...PaymentSize}
                    dataKey="oneOffMonthlyDonationAverage"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    Recurring payments: How much have you donated per month on
                    average?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <SingleAnswerChart
                    {...PaymentSize}
                    dataKey="recurringMonthlyDonationAverage"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    How much would you be willing to donate per month?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <SingleAnswerChart
                    {...PaymentSize}
                    dataKey="willingToDonatePerMonth"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    Why did you choose &quot;_____&quot; for supporting mod
                    creators?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <SingleAnswerChart
                    {...DonateUnwillingnessReason}
                    dataKey="reasonForNotWillingToDonate"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    If it was possible, would you like to create mods as a
                    profession?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <SingleAnswerChart
                    {...ModdingProfessionReply}
                    dataKey="interstInModdingProfession"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    Which of the following monetization models do you consider
                    acceptable?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <MultipleAnswerChart
                    {...MonetizationModels}
                    dataKey="acceptableMonetizationModels"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    How would you prefer a premium subscription to look like?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <MultipleAnswerChart
                    {...SubscriptionFeatures}
                    dataKey="subscriptionFeaturesPreferenceRanking"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    If a premium subscription could be used to support mod
                    creators and tool development, would you consider purchasing
                    one?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <YesNoChart dataKey="subscriptionConsiderationWillingness" />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.section__header}>
                  <div className={styles.section__title}>
                    One last question! How old are you?
                  </div>
                </div>
                <div className={styles.section__body}>
                  <SingleAnswerChart {...AgeGroup} dataKey="ageGroup" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DataContextProvider>
  );
}
