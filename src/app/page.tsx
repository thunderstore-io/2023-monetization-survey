import styles from "./page.module.css";
import { DataContextProvider } from "@/components/DataContext";
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
import { OrderedMultipleAnswerChart } from "@/components/graphs/OrderedMultipleAnswerChart";
import { DynamicAnswerChart } from "@/components/graphs/DynamicAnswerChart";
import { DynamicNumberAnswerChart } from "@/components/graphs/DynamicNumberAnswerChart";
import { Sidebar } from "@/components/Sidebar/Sidebar";

const ChatGPT = (
  <span style={{ color: "#f88965" }}>
    Categorization was done by AI and might contain inaccuracies
  </span>
);

export default function Home() {
  return (
    <>
      <DataContextProvider>
        <div className={styles.content}>
          <Sidebar />
          <main className={styles.main}>
            <div className={styles.container}>
              <div className={styles.questions}>
                <YesNoChart
                  sectionTitle="Are you a mod creator?"
                  dataKey="isModder"
                />

                <MultipleAnswerChart
                  categories={ModdingPlatform}
                  sectionTitle="Which platforms do you use as a mod creator?"
                  dataKey="platformsUsedAsModder"
                />

                <DynamicAnswerChart
                  sectionTitle="Why do you use the platform of choice as a mod creator?"
                  sectionDescription={ChatGPT}
                  dataKey="platformsUseReasonAsModderCategory"
                />

                <MultipleAnswerChart
                  categories={ModdingPlatform}
                  sectionTitle="Which platforms do you use as an end-user?"
                  dataKey="platformsUsedAsUser"
                />

                <DynamicAnswerChart
                  sectionTitle="Why do you use the platform of choice as an end user?"
                  sectionDescription={ChatGPT}
                  dataKey="platformsUseReasonAsUserCategory"
                />

                <SingleAnswerChart
                  categories={CreatorSupport}
                  sectionTitle="Have you supported mod creators directly?"
                  dataKey="hasSupportedCreators"
                />

                <SingleAnswerChart
                  categories={PaymentSize}
                  sectionTitle="One-off payments: How much have you donated per month on average?"
                  dataKey="oneOffMonthlyDonationAverage"
                />

                <SingleAnswerChart
                  categories={PaymentSize}
                  sectionTitle="Recurring payments: How much have you donated per month on average?"
                  dataKey="recurringMonthlyDonationAverage"
                />

                <SingleAnswerChart
                  categories={PaymentSize}
                  sectionTitle="How much would you be willing to donate per month?"
                  dataKey="willingToDonatePerMonth"
                />

                <SingleAnswerChart
                  categories={DonateUnwillingnessReason}
                  sectionTitle='Why did you choose "No" for supporting mod creators?'
                  dataKey="reasonForNotWillingToDonate"
                />

                <DynamicAnswerChart
                  sectionTitle='Responses for choosing "Other" for not supporting mod creators:'
                  sectionDescription={ChatGPT}
                  dataKey="reasonForNotWillingToDonateOtherCategory"
                />

                <MultipleAnswerChart
                  categories={ModdingProfessionReply}
                  sectionTitle="If it was possible, would you like to create mods as a profession?"
                  dataKey="interstInModdingProfession"
                />

                <DynamicAnswerChart
                  sectionTitle='Responses for choosing "Other" in creating mods as a profession:'
                  sectionDescription={ChatGPT}
                  dataKey="interstInModdingProfessionOtherCategory"
                />

                <MultipleAnswerChart
                  categories={MonetizationModels}
                  sectionTitle="Which of the following monetization models do you consider acceptable?"
                  dataKey="acceptableMonetizationModels"
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
                  direction="vertical"
                  bucketSize={4}
                />

                <DynamicAnswerChart
                  sectionTitle="When you consider purchasing a subscription, what is the main factor you base your decision on?"
                  sectionDescription={ChatGPT}
                  dataKey="subscriptionDecisionMainFactorCategory"
                />

                <YesNoChart
                  sectionTitle="If a premium subscription could be used to support mod creators and tool development, would you consider purchasing one?"
                  dataKey="subscriptionConsiderationWillingness"
                />

                <SingleAnswerChart
                  categories={AgeGroup}
                  sectionTitle="One last question! How old are you?"
                  dataKey="ageGroup"
                />
              </div>
            </div>
          </main>
        </div>
      </DataContextProvider>
    </>
  );
}
