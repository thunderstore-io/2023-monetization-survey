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
      <main className={styles.main}>
        <FilterSet />
        <h1>Are you a mod creator?</h1>
        <YesNoChart dataKey="isModder" />
        <br />
        <h1>Which platforms do you use as a mod creator?</h1>
        <MultipleAnswerChart
          {...ModdingPlatform}
          dataKey="platformsUsedAsModder"
        />
        <br />
        <h1>Which platforms do you use as an end-user?</h1>
        <MultipleAnswerChart
          {...ModdingPlatform}
          dataKey="platformsUsedAsUser"
        />
        <br />
        <h1>Have you supported mod creators directly?</h1>
        <SingleAnswerChart {...CreatorSupport} dataKey="hasSupportedCreators" />
        <br />
        <h1>
          One-off payments: How much have you donated per month on average?
        </h1>
        <SingleAnswerChart
          {...PaymentSize}
          dataKey="oneOffMonthlyDonationAverage"
        />
        <br />
        <h1>
          Recurring payments: How much have you donated per month on average?
        </h1>
        <SingleAnswerChart
          {...PaymentSize}
          dataKey="recurringMonthlyDonationAverage"
        />
        <br />
        <h1>How much would you be willing to donate per month?</h1>
        <SingleAnswerChart {...PaymentSize} dataKey="willingToDonatePerMonth" />
        <br />
        <h1>
          Why did you choose &quot;_____&quot; for supporting mod creators?
        </h1>
        <SingleAnswerChart
          {...DonateUnwillingnessReason}
          dataKey="reasonForNotWillingToDonate"
        />
        <br />
        <h1>
          If it was possible, would you like to create mods as a profession?
        </h1>
        <SingleAnswerChart
          {...ModdingProfessionReply}
          dataKey="interstInModdingProfession"
        />
        <br />
        <h1>
          Which of the following monetization models do you consider acceptable?
        </h1>
        <MultipleAnswerChart
          {...MonetizationModels}
          dataKey="acceptableMonetizationModels"
        />
        <br />
        <h1>How would you prefer a premium subscription to look like?</h1>
        <br />
        <MultipleAnswerChart
          {...SubscriptionFeatures}
          dataKey="subscriptionFeaturesPreferenceRanking"
        />
        <h1>
          If a premium subscription could be used to support mod creators and
          tool development, would you consider purchasing one?
        </h1>
        <YesNoChart dataKey="subscriptionConsiderationWillingness" />
        <br />
        <h1>One last question! How old are you?</h1>
        <SingleAnswerChart {...AgeGroup} dataKey="ageGroup" />
      </main>
    </DataContextProvider>
  );
}
