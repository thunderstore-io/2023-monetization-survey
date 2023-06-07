const isProd = process.env.NODE_ENV === "production";
export const assetPrefix = isProd ? "/2023-monetization-survey" : "";

export function IsSet<T>(
  val: T | null | undefined
): val is Exclude<T, [null, undefined]> {
  return val !== null && val !== undefined;
}
