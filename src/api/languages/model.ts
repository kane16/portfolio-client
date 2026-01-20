export const LANGUAGE_LEVELS = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "Native",
] as const

export type LanguageLevel = (typeof LANGUAGE_LEVELS)[number]

export interface Language {
  id?: number
  name: string
  level: LanguageLevel
}
