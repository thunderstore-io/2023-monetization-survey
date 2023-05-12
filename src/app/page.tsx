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
                question="Are you a mod creator?"
                dataKey="isModder"
              />

              <MultipleAnswerChart
                question="Which platforms do you use as a mod creator?"
                {...ModdingPlatform}
                dataKey="platformsUsedAsModder"
                direction="horizontal"
              />

              <DynamicAnswerChart
                question='Why do you use "Other" as a mod creator?'
                dataKey="platformsUseReasonAsModderCategory"
                direction="horizontal"
              ></DynamicAnswerChart>

              <MultipleAnswerChart
                {...ModdingPlatform}
                question="Which platforms do you use as an end-user?"
                dataKey="platformsUsedAsUser"
                direction="horizontal"
              />

              <DynamicAnswerChart
                question="Why do you use ___ as an end user?"
                dataKey="platformsUseReasonAsUserCategory"
                direction="horizontal"
              />

              <SingleAnswerChart
                {...CreatorSupport}
                question="Have you supported mod creators directly?"
                dataKey="hasSupportedCreators"
                direction="horizontal"
              />

              <SingleAnswerChart
                {...PaymentSize}
                question="One-off payments: How much have you donated per month on average?"
                dataKey="oneOffMonthlyDonationAverage"
                direction="horizontal"
              />

              <SingleAnswerChart
                {...PaymentSize}
                question="Recurring payments: How much have you donated per month on average?"
                dataKey="recurringMonthlyDonationAverage"
                direction="horizontal"
              />

              <SingleAnswerChart
                {...PaymentSize}
                question="How much would you be willing to donate per month?"
                dataKey="willingToDonatePerMonth"
                direction="horizontal"
              />

              <SingleAnswerChart
                {...DonateUnwillingnessReason}
                question='Why did you choose "No" for supporting mod creators?'
                dataKey="reasonForNotWillingToDonate"
                direction="horizontal"
              />

              <DynamicAnswerChart
                dataKey="reasonForNotWillingToDonateOtherCategory"
                question='Responses for choosing "Other" for not supporting mod creators:'
                direction="horizontal"
              />

              <MultipleAnswerChart
                {...ModdingProfessionReply}
                question="If it was possible, would you like to create mods as a profession?"
                dataKey="interstInModdingProfession"
                direction="horizontal"
              />

              <DynamicAnswerChart
                question='Responses for choosing "Other" in creating mods as a profession:'
                dataKey="interstInModdingProfessionOtherCategory"
                direction="horizontal"
              />

              <MultipleAnswerChart
                {...MonetizationModels}
                question="Which of the following monetization models do you consider acceptable?"
                dataKey="acceptableMonetizationModels"
                direction="horizontal"
              />

              <OrderedMultipleAnswerChart
                {...SubscriptionFeatures}
                question="How would you prefer a premium subscription to look like?"
                dataKey="subscriptionFeaturesPreferenceRanking"
                direction="vertical"
              />

              <DynamicNumberAnswerChart
                question="What would you consider a fair price for a monthly premium subscription?"
                dataKey="subscriptionFairPrice"
                direction="horizontal"
              />

              <DynamicAnswerChart
                question="When you consider purchasing a subscription, what is the main factor you base your decision on?"
                dataKey="subscriptionDecisionMainFactorCategory"
                direction="horizontal"
              />

              <YesNoChart
                question="If a premium subscription could be used to support mod creators and tool development, would you consider purchasing one?"
                dataKey="subscriptionConsiderationWillingness"
              />

              <SingleAnswerChart
                {...AgeGroup}
                question="One last question! How old are you?"
                dataKey="ageGroup"
              />
            </div>
          </div>
        </main>
      </div>
    </DataContextProvider>
  );
}
