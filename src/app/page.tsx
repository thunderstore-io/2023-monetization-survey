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
import { OrderedMultipleAnswerChart } from "@/components/graphs/OrderedMultipleAnswerChart";
import { DynamicAnswerChart } from "@/components/graphs/DynamicAnswerChart";
import { DynamicNumberAnswerChart } from "@/components/graphs/DynamicNumberAnswerChart";

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
              <YesNoChart
                sectionTitle="Are you a mod creator?"
                dataKey="isModder"
              />

              <MultipleAnswerChart
                {...ModdingPlatform}
                sectionTitle="Which platforms do you use as a mod creator?"
                dataKey="platformsUsedAsModder"
                direction="horizontal"
              />

              <DynamicAnswerChart
                sectionTitle='Why do you use "Other" as a mod creator?'
                dataKey="platformsUseReasonAsModderCategory"
                direction="horizontal"
              />

              <MultipleAnswerChart
                {...ModdingPlatform}
                sectionTitle="Which platforms do you use as an end-user?"
                dataKey="platformsUsedAsUser"
                direction="horizontal"
              />

              <DynamicAnswerChart
                sectionTitle="Why do you use ___ as an end user?"
                dataKey="platformsUseReasonAsUserCategory"
                direction="horizontal"
              />

              <SingleAnswerChart
                {...CreatorSupport}
                sectionTitle="Have you supported mod creators directly?"
                dataKey="hasSupportedCreators"
                direction="horizontal"
              />

              <SingleAnswerChart
                {...PaymentSize}
                sectionTitle="One-off payments: How much have you donated per month on average?"
                dataKey="oneOffMonthlyDonationAverage"
                direction="horizontal"
              />

              <SingleAnswerChart
                {...PaymentSize}
                sectionTitle="Recurring payments: How much have you donated per month on average?"
                dataKey="recurringMonthlyDonationAverage"
                direction="horizontal"
              />

              <SingleAnswerChart
                {...PaymentSize}
                sectionTitle="How much would you be willing to donate per month?"
                dataKey="willingToDonatePerMonth"
                direction="horizontal"
              />

              <SingleAnswerChart
                {...DonateUnwillingnessReason}
                sectionTitle='Why did you choose "No" for supporting mod creators?'
                dataKey="reasonForNotWillingToDonate"
                direction="horizontal"
              />

              <DynamicAnswerChart
                sectionTitle='Responses for choosing "Other" for not supporting mod creators:'
                dataKey="reasonForNotWillingToDonateOtherCategory"
                direction="horizontal"
              />

              <MultipleAnswerChart
                {...ModdingProfessionReply}
                sectionTitle="If it was possible, would you like to create mods as a profession?"
                dataKey="interstInModdingProfession"
                direction="horizontal"
              />

              <DynamicAnswerChart
                sectionTitle='Responses for choosing "Other" in creating mods as a profession:'
                dataKey="interstInModdingProfessionOtherCategory"
                direction="horizontal"
              />

              <MultipleAnswerChart
                {...MonetizationModels}
                sectionTitle="Which of the following monetization models do you consider acceptable?"
                dataKey="acceptableMonetizationModels"
                direction="horizontal"
              />

              <OrderedMultipleAnswerChart
                {...SubscriptionFeatures}
                sectionTitle="How would you prefer a premium subscription to look like?"
                dataKey="subscriptionFeaturesPreferenceRanking"
                direction="vertical"
              />

              <DynamicNumberAnswerChart
                sectionTitle="What would you consider a fair price for a monthly premium subscription?"
                dataKey="subscriptionFairPrice"
                direction="horizontal"
              />

              <DynamicAnswerChart
                sectionTitle="When you consider purchasing a subscription, what is the main factor you base your decision on?"
                dataKey="subscriptionDecisionMainFactorCategory"
                direction="horizontal"
              />

              <YesNoChart
                sectionTitle="If a premium subscription could be used to support mod creators and tool development, would you consider purchasing one?"
                dataKey="subscriptionConsiderationWillingness"
              />

              <SingleAnswerChart
                {...AgeGroup}
                sectionTitle="One last question! How old are you?"
                dataKey="ageGroup"
              />
            </div>
          </div>
        </main>
      </div>
    </DataContextProvider>
  );
}
