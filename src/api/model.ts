export class NotFoundResponse {
  message: string

  constructor(message: string) {
    this.message = message
  }
}

export interface User {
  jwtDesc: string
  username: string
  email: string
  roles: string[]
  firstname: string
  lastname: string
}

export interface ResumeHistory {
  defaultPortfolio: ResumeVersion
  history: ResumeVersion[]
}

export interface ResumeShortcut {
  title: string
  summary: string
  image: Image
}

export interface Image {
  name: string
  src: string
}

export interface ResumeVersion {
  id: number
  title: string
  summary: string
  version: number
  state: string
}

export interface Resume {
  id: number
  fullname: string
  imageSource: string
  title: string
  summary: string
  skills: Skill[]
  languages: Language[]
  education: Education[]
  sideProjects: Project[]
  workHistory: Experience[]
  hobbies: string[]
}

export interface Institution {
  name: string
  city: string
  country: string
}

export interface Education {
  id?: number | null
  title: string
  institution: Institution
  timeframe: Timespan
  fieldOfStudy: string
  grade: number
  type: string
  description?: string | null
  externalLinks: string[]
}

export interface Skill {
  name: string
  description?: string
  level?: number
  detail?: string
  domains: string[]
}

export interface Language {
  id?: number
  name: string
  level: LanguageLevel
}

export const LANGUAGE_LEVELS = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "Native",
] as const

type LanguageLevel = (typeof LANGUAGE_LEVELS)[number]

export interface Experience {
  id?: number
  position: string
  business: string
  summary: string
  description: string
  timespan?: Timespan
  skills: Skill[]
}

export type Project = Experience

export interface Timespan {
  start: string
  end?: string
}

export interface ResumeFilter {
  technologyDomain: string[]
  skills: string[]
  business: string[]
}

export enum ValidationStatus {
  VALID = "VALID",
  INVALID = "INVALID",
  NOT_VALIDATED = "NOT_VALIDATED",
}

export interface ValidationStep {
  id: number
  name: string
  status: ValidationStatus
  messages: string[]
  endpoint: string
}

export interface ValidationResult {
  isValid: boolean
  steps: ValidationStep[]
}

export interface ResumeValidationResponse {
  isValid: boolean
  progress: number
  validationResults: ValidationDomainResponse[]
}

export interface SimpleValidationResponse {
  isValid: boolean
  domain: ValidationResumeDomain
  errors: string[]
}

export interface ValidationDomainResponse {
  domain: ValidationResumeDomain
  validationStatus: ValidationStatus
  errors: string[]
}

export interface ValidationResumeDomain {
  title: string
  weight: number
  endpoint: string
}
