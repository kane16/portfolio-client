export function extractNumber(value: string | undefined): number {
  if (typeof value === "string") {
    return parseInt(value)
  }

  return 0
}

export function isNumber(value: string | undefined): boolean {
  if (typeof value === "string") {
    const num = parseInt(value)
    return !isNaN(parseFloat(value)) && isFinite(num)
  }

  return false
}

export function isEmptyString(value: string | undefined): boolean {
  return value === undefined || value.trim() === ""
}

export function compareDates(date: Date, other: Date): number {
  const yearDiff = date.getFullYear() - other.getFullYear()
  const monthDiff = date.getMonth() - other.getMonth()
  const dayDiff = date.getDate() - other.getDate()

  if (yearDiff !== 0) {
    return yearDiff
  }

  if (monthDiff !== 0) {
    return monthDiff
  }

  return dayDiff
}

export function capitalize(value: string): string {
  if (value.length === 0) {
    return value
  }
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}
