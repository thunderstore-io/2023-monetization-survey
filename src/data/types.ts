import { string } from "prop-types";

export enum ModdingPlatform {
  THUNDERSTORE = "Thunderstore",
  NEXUS = "Nexusmods",
  CURSEFORGE = "CurseForge",
  MODIO = "mod.io",
  STEAM_WORKSHOP = "Steam Workshop",
  OTHER = "Other",
}

export enum CreatorSupport {
  YES_ONE_OFF = "Yes, one-off payments",
  YES_RECURRING = "Yes, recurring payments",
  NO_BUT_WOULD_LIKE_TO = "No, but I would like to",
  NO = "No",
}

export enum PaymentSize {
  _0_5 = "0-5 USD",
  _5_10 = "5-10 USD",
  _10_25 = "10-25 USD",
  _25_50 = "25-50 USD",
  _50_PLUS = "50+ USD",
  UNDISCLOSED = "Prefer not to say",
}

export enum DonateUnwillingnessReason {
  DONT_WANT_TO = "I don't want to",
  NO_INCENTIVES = "Not enough incentives",
  PROCESS_TOO_COMPLEX = "Process is too complex",
  FINANCIALLY_NOT_POSSIBLE = "Financially not possible",
  OTHER = "Other",
}

export enum ModdingProfessionReply {
  YES_AWESOME = "Yes, that would be awesome",
  NO_HOBBY = "No, I only create mods as a hobby",
  NO = "No",
  OTHER = "Other",
}

export enum MonetizationModels {
  ADS_EVERYONE = "Displaying ads to everyone",
  DONATIONS = "Donations",
  ADS_FREE_USERS_SUBSCRIPTION_TO_REMOVE = "Displaying ads to free users and offering an ad-free subscription",
  SUBSCRIPTION_WITH_COSMETICS = "Subscription with cosmetic features (e.g. profile customization)",
  SUBSCRIPTION_WITH_ADDITIONAL_FUNCTIONALITY = "Susbcription with additional functionality in contrast to free users",
  SUBSCRIPTION_WITH_EXCLUSIVE_CONTENT = "Subscription with exclusive content in contrast to free users",
  PAID_CONTENT = "Paid content",
  VENTURE_CAPITAL = "I'd be fine with getting venture capital investors involved",
}

export enum SubscriptionFeatures {
  NO_ADS = "No ads",
  EXCLUSIVE_CUSTOMIZATION = "Exclusive customization options (e.g. an animated avatar, a special badge...)",
  EXCLUSIVE_QOL = "Exclusive QoL features",
  UNLIMITED_DL_SPEED = "Unlimited download speed (free users throttled)",
  EARLY_ACCESS_PLATFORM_FEATURES = "Early access to new platform features",
  EARLY_ACCESS_MODS = "Early access to mods (mod creator controls)",
  PREMIUM_MODS = "Premium mods (one subscription to access all)",
  SUPPORTING_MOD_CREATORS = "Supporting mod creators",
  SUPPORTING_PLATFORM = "Supporting the platform",
}

export enum AgeGroup {
  _13_18 = "13-18",
  _19_25 = "19-25",
  _26_32 = "26-32",
  _33 = "33+",
  UNDISCLOSED = "Prefer not to say",
}

export type DynamicCategory = {
  id: string;
  description: string;
};

export type IDataEntry = {
  /**
   * Are you a mod creator?
   */
  isModder: boolean;

  /**
   * Which platforms do you use as a mod creator?
   */
  platformsUsedAsModder: ModdingPlatform[];

  /**
   * If {@link platformsUsedAsModder} includes OTHER, this is the content
   */
  platformsUsedAsModderOther?: string;

  /**
   * Why do you use ___ as a mod creator?
   */
  platformsUseReasonAsModder: string;

  /**
   * Post-processed categorization of the {@link platformsUseReasonAsModder} field.
   */
  platformsUseReasonAsModderCategory?: DynamicCategory[];

  /**
   * Which platforms do you use as an end user?
   */
  platformsUsedAsUser: ModdingPlatform[];

  /**
   * If {@link platformsUsedAsUser} includes OTHER, this is the content
   */
  platformsUsedAsUserOther?: string;

  /**
   * Why do you use ___ as an end user?
   */
  platformsUseReasonAsUser: string;

  /**
   * Post-processed categorization of the {@link platformsUseReasonAsUser} field.
   */
  platformsUseReasonAsUserCategory?: DynamicCategory[];

  /**
   * Have you supported mod creators directly?
   */
  hasSupportedCreators: CreatorSupport;

  /**
   * One-off payments: How much have you donated per month on average?
   */
  oneOffMonthlyDonationAverage?: PaymentSize;

  /**
   * Recurring payments: How much have you donated per month on average?
   */
  recurringMonthlyDonationAverage?: PaymentSize;

  /**
   * How much would you be willing to donate per month?
   */
  willingToDonatePerMonth?: PaymentSize;

  /**
   * Reason for choosing no for mod creator support
   */
  reasonForNotWillingToDonate: DonateUnwillingnessReason;

  /**
   * If {@link reasonForNotWillingToDonate} was OTHER, this is the message
   */
  reasonForNotWillingToDonateOther?: string;

  /**
   * Post-processed categorization of the {@link reasonForNotWillingToDonateOther} field.
   */
  reasonForNotWillingToDonateOtherCategory?: DynamicCategory[];

  /**
   * If it was possible, would you like to create mods as a profession?
   */
  interstInModdingProfession: ModdingProfessionReply;

  /**
   * If {@link interstInModdingProfession} was OTHER, this is the message
   */
  interstInModdingProfessionOther?: string;

  /**
   * Post-processed categorization of the {@link interstInModdingProfessionOther} field.
   */
  interstInModdingProfessionOtherCategory?: DynamicCategory[];

  /**
   * Which of the following monetization models do you consider acceptable?
   */
  acceptableMonetizationModels: MonetizationModels[];

  /**
   * How would you prefer a premium subscription to look like?
   */
  subscriptionFeaturesPreferenceRanking: SubscriptionFeatures[];

  /**
   * What would you consider a fair price for a monthly premium subscription?
   */
  subscriptionFairPrice: number;

  /**
   * When you consider purchasing a subscription, what is the main factor you base your decision on?
   */
  subscriptionDecisionMainFactor: string;

  /**
   * Post-processed categorization of the {@link subscriptionDecisionMainFactor} field.
   */
  subscriptionDecisionMainFactorCategory?: DynamicCategory[];

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
