export function IsSet<T>(
  val: T | null | undefined
): val is Exclude<T, [null, undefined]> {
  return val !== null && val !== undefined;
}
