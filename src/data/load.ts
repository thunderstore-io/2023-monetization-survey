import {
  AgeGroup,
  CreatorSupport,
  DonateUnwillingnessReason,
  DynamicCategory,
  IDataEntry,
  ModdingPlatform,
  ModdingProfessionReply,
  MonetizationModels,
  PaymentSize,
  SubscriptionFeatures,
} from "@/data/types";
import { faker } from "@faker-js/faker";
import _ from "lodash";

import * as results from "./results.json";

const PLATFORM_OPTIONS = [
  ModdingPlatform.THUNDERSTORE,
  ModdingPlatform.NEXUS,
  ModdingPlatform.CURSEFORGE,
  ModdingPlatform.MODIO,
  ModdingPlatform.STEAM_WORKSHOP,
  ModdingPlatform.OTHER,
];

const SUPPORT_OPTIONS = [
  CreatorSupport.YES_ONE_OFF,
  CreatorSupport.YES_RECURRING,
  CreatorSupport.NO_BUT_WOULD_LIKE_TO,
  CreatorSupport.NO,
];

const PAYMENT_SIZE_OPTIONS = [
  PaymentSize._0_5,
  PaymentSize._5_10,
  PaymentSize._10_25,
  PaymentSize._25_50,
  PaymentSize._50_PLUS,
  PaymentSize.UNDISCLOSED,
];

const DONATE_UNWILLINGNESS_OPTIONS = [
  DonateUnwillingnessReason.DONT_WANT_TO,
  DonateUnwillingnessReason.FINANCIALLY_NOT_POSSIBLE,
  DonateUnwillingnessReason.NO_INCENTIVES,
  DonateUnwillingnessReason.PROCESS_TOO_COMPLEX,
  DonateUnwillingnessReason.OTHER,
];

const MOD_PROFESSION_OPTIONS = [
  ModdingProfessionReply.YES_AWESOME,
  ModdingProfessionReply.NO_HOBBY,
  ModdingProfessionReply.NO,
  ModdingProfessionReply.OTHER,
];

const MONETIZATION_MODELS = [
  MonetizationModels.ADS_EVERYONE,
  MonetizationModels.DONATIONS,
  MonetizationModels.ADS_FREE_USERS_SUBSCRIPTION_TO_REMOVE,
  MonetizationModels.SUBSCRIPTION_WITH_COSMETICS,
  MonetizationModels.SUBSCRIPTION_WITH_ADDITIONAL_FUNCTIONALITY,
  MonetizationModels.SUBSCRIPTION_WITH_EXCLUSIVE_CONTENT,
  MonetizationModels.PAID_CONTENT,
  MonetizationModels.VENTURE_CAPITAL,
];

const SUBSCRIPTION_FEATURES = [
  SubscriptionFeatures.EARLY_ACCESS_PLATFORM_FEATURES,
  SubscriptionFeatures.EARLY_ACCESS_MODS,
  SubscriptionFeatures.PREMIUM_MODS,
  SubscriptionFeatures.EXCLUSIVE_CUSTOMIZATION,
  SubscriptionFeatures.EXCLUSIVE_QOL,
  SubscriptionFeatures.UNLIMITED_DL_SPEED,
  SubscriptionFeatures.SUPPORTING_MOD_CREATORS,
  SubscriptionFeatures.SUPPORTING_PLATFORM,
  SubscriptionFeatures.NO_ADS,
];

const AGE_GROUP_OPTIONS = [
  AgeGroup._13_18,
  AgeGroup._19_25,
  AgeGroup._26_32,
  AgeGroup._33,
  AgeGroup.UNDISCLOSED,
];

const DYNAMIC_CATEGORY_OPTIONS: DynamicCategory[] = [
  { id: faker.lorem.word(), description: faker.lorem.sentence() },
  { id: faker.lorem.word(), description: faker.lorem.sentence() },
  { id: faker.lorem.word(), description: faker.lorem.sentence() },
  { id: faker.lorem.word(), description: faker.lorem.sentence() },
  { id: faker.lorem.word(), description: faker.lorem.sentence() },
];

function getDynamicCategories(): DynamicCategory[] | undefined {
  if (Math.random() < 0.6) return;
  return _.sampleSize(
    DYNAMIC_CATEGORY_OPTIONS,
    faker.datatype.number({
      min: 0,
      max: DYNAMIC_CATEGORY_OPTIONS.length,
    })
  );
}

function generateRandomEntry(): IDataEntry {
  return {
    isModder: faker.datatype.boolean(),
    platformsUsedAsModder: _.sampleSize(
      PLATFORM_OPTIONS,
      faker.datatype.number({
        min: 0,
        max: PLATFORM_OPTIONS.length,
      })
    ),
    platformsUseReasonAsModder: faker.lorem.sentence(),
    platformsUseReasonAsModderCategory: getDynamicCategories(),
    platformsUsedAsUser: _.sampleSize(
      PLATFORM_OPTIONS,
      faker.datatype.number({
        min: 0,
        max: PLATFORM_OPTIONS.length,
      })
    ),
    platformsUseReasonAsUser: faker.lorem.sentence(),
    platformsUseReasonAsUserCategory: getDynamicCategories(),
    hasSupportedCreators: _.sample(SUPPORT_OPTIONS)!,
    oneOffMonthlyDonationAverage: _.sample(PAYMENT_SIZE_OPTIONS),
    recurringMonthlyDonationAverage: _.sample(PAYMENT_SIZE_OPTIONS),
    willingToDonatePerMonth: _.sample(PAYMENT_SIZE_OPTIONS),
    reasonForNotWillingToDonate: _.sample(DONATE_UNWILLINGNESS_OPTIONS)!,
    reasonForNotWillingToDonateOther: faker.lorem.sentence(),
    reasonForNotWillingToDonateOtherCategory: getDynamicCategories(),
    interstInModdingProfession: _.sampleSize(
      MOD_PROFESSION_OPTIONS,
      faker.datatype.number({
        min: 0,
        max: MOD_PROFESSION_OPTIONS.length,
      })
    ),
    interstInModdingProfessionOther: faker.lorem.sentence(),
    interstInModdingProfessionOtherCategory: getDynamicCategories(),
    acceptableMonetizationModels: _.sampleSize(
      MONETIZATION_MODELS,
      faker.datatype.number({
        min: 0,
        max: MONETIZATION_MODELS.length,
      })
    ),
    subscriptionFeaturesPreferenceRanking: _.shuffle(SUBSCRIPTION_FEATURES),
    subscriptionFairPrice: faker.datatype.number({ min: 5, max: 50 }),
    subscriptionDecisionMainFactor: faker.lorem.sentence(),
    subscriptionDecisionMainFactorCategory: getDynamicCategories(),
    subscriptionConsiderationWillingness: faker.datatype.boolean(),
    ageGroup: _.sample(AGE_GROUP_OPTIONS)!,
  };
}

export function loadDummyData(count: number): IDataEntry[] {
  return Array(count)
    .fill(0)
    .map(() => generateRandomEntry());
}

export function loadData(): IDataEntry[] {
  return results["entries"] as any as IDataEntry[];
}
