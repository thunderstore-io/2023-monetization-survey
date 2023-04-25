import React, { PropsWithChildren } from "react";

type CreatorSupport = string;
type PaymentSize = string;
type ModdingProfessionReply = string;
type MonetizationModels = string;
type SubscriptionFeatures = string;
type AgeGroup = string;

export type IDataEntry = {
  /**
   * Are you a mod creator?
   */
  isModder: boolean;

  /**
   * Which platforms do you use as a mod creator?
   */
  platformsUsedAsModder: string[];

  /**
   * Why do you use ___ as a mod creator?
   */
  platformsUseReasonAsModder: string;

  /**
   * Which platforms do you use as an end user?
   */
  platformsUsedAsUser: string[];

  /**
   * Why do you use ___ as an end user?
   */
  platformsUseReasonAsUser: string;

  /**
   * Have you supported mod creators directly?
   */
  hasSupportedCreators: CreatorSupport;

  /**
   * One-off payments: How much have you donated per month on average?
   */
  oneOffMonthlyDonationAverage: PaymentSize;

  /**
   * Recurring payments: How much have you donated per month on average?
   */
  recurringMonthlyDonationAverage: PaymentSize;

  /**
   * How much would you be willing to donate per month?
   */
  willingToDonatePerMonth: PaymentSize;

  /**
   * Reason for choosing no for mod creator support
   */
  reasonForNotWillingToDonate: string;

  /**
   * If it was possible, would you like to create mods as a profession?
   */
  interstInModdingProfession: ModdingProfessionReply;

  /**
   * Which of the following monetization models do you consider acceptable?
   */
  acceptableMonetizationModels: MonetizationModels;

  /**
   * How would you prefer a premium subscription to look like?
   */
  subscriptionFeaturesPreferenceRanking: SubscriptionFeatures;

  /**
   * What would you consider a fair price for a monthly premium subscription?
   */
  subscriptionFairPrice: number;

  /**
   * When you consider purchasing a subscription, what is the main factor you base your decision on?
   */
  subscriptionDecisionMainFactor: string;

  /**
   * If a premium subscription could be used to support mod creators and tool development,
   * would you consider purchasing one?
   */
  subscriptionConsiderationWillingness: boolean;

  /**
   * One last question! How old are you?
   */
  ageGroup: AgeGroup;
};

export type IDataContext = {
  rows: IDataEntry[];
};

export const DataContextProvider: React.FC<PropsWithChildren> = (props) => {
  return (
    <DataContext.Provider value={{ rows: [] }}>
      {props.children}
    </DataContext.Provider>
  );
};

const DataContext = React.createContext<IDataContext>({ rows: [] });
