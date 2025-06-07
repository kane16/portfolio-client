export function extractNumber(value: string | undefined): number {
  if (typeof value === "string") {
    return parseInt(value);
  }

  return 0;
}

export function isNumber(value: string | undefined): boolean {
  if (typeof value === "string") {
    const num = parseInt(value);
    return !isNaN(parseFloat(value)) && isFinite(num);
  }

  return false;
}

export function isEmptyString(value: string | undefined): boolean {
  return value === undefined || value.trim() === "";
}