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
import { Question } from "@/components/Question/Question";

export default function Home() {
  const [sidebarActive, toggleSidebar] = useState(false);

  return (
    <DataContextProvider>
      <div className={styles.content}>
        <aside
          className={`${styles["sidebar"]} ${
            sidebarActive ? styles["is_active"] : null
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
            <div className={styles.questions}>
              <Question question="Are you a mod creator?">
                <YesNoChart dataKey="isModder" />
              </Question>

              <Question question="Which platforms do you use as a mod creator?">
                <MultipleAnswerChart
                  {...ModdingPlatform}
                  dataKey="platformsUsedAsModder"
                  direction="vertical"
                />
              </Question>

              <Question question="Which platforms do you use as an end-user?">
                <MultipleAnswerChart
                  {...ModdingPlatform}
                  dataKey="platformsUsedAsUser"
                  direction="vertical"
                />
              </Question>

              <Question question="Have you supported mod creators directly?">
                <SingleAnswerChart
                  {...CreatorSupport}
                  dataKey="hasSupportedCreators"
                />
              </Question>

              <Question question="One-off payments: How much have you donated per month on average?">
                <SingleAnswerChart
                  {...PaymentSize}
                  dataKey="oneOffMonthlyDonationAverage"
                />
              </Question>

              <Question question="Recurring payments: How much have you donated per month on average?">
                <SingleAnswerChart
                  {...PaymentSize}
                  dataKey="recurringMonthlyDonationAverage"
                />
              </Question>

              <Question question="How much would you be willing to donate per month?">
                <SingleAnswerChart
                  {...PaymentSize}
                  dataKey="willingToDonatePerMonth"
                />
              </Question>

              <Question question='Why did you choose "_____" for supporting mod creators?'>
                <SingleAnswerChart
                  {...DonateUnwillingnessReason}
                  dataKey="reasonForNotWillingToDonate"
                />
              </Question>

              <Question question="If it was possible, would you like to create mods as a profession?">
                <SingleAnswerChart
                  {...ModdingProfessionReply}
                  dataKey="interstInModdingProfession"
                />
              </Question>

              <Question question="Which of the following monetization models do you consider acceptable?">
                <MultipleAnswerChart
                  {...MonetizationModels}
                  dataKey="acceptableMonetizationModels"
                />
              </Question>

              <Question question="How would you prefer a premium subscription to look like?">
                <MultipleAnswerChart
                  {...SubscriptionFeatures}
                  dataKey="subscriptionFeaturesPreferenceRanking"
                />
              </Question>

              <Question question="If a premium subscription could be used to support mod creators and tool development, would you consider purchasing one?">
                <YesNoChart dataKey="subscriptionConsiderationWillingness" />
              </Question>

              <Question question="One last question! How old are you?">
                <SingleAnswerChart {...AgeGroup} dataKey="ageGroup" />
              </Question>
            </div>
          </div>
        </main>
      </div>
    </DataContextProvider>
  );
}
