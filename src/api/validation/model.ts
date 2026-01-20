export interface Timespan {
  start: string
  end?: string
}

export interface Skill {
  name: string
  description?: string
  level?: number
  detail?: string
  domains: string[]
}

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

export interface FieldConstraint {
  path: string
  constraints: ValidationConstraints
}

export interface ValidationConstraints {
  minLength?: number
  maxLength?: number
  nullable: boolean
}

export const initialExperienceSteps: ValidationStep[] = [
  {
    id: 1,
    name: "Business",
    status: ValidationStatus.NOT_VALIDATED,
    messages: [],
    endpoint: "business",
  },
  {
    id: 2,
    name: "Timeframe",
    status: ValidationStatus.NOT_VALIDATED,
    messages: [],
    endpoint: "timeframe",
  },
  {
    id: 3,
    name: "Skills",
    status: ValidationStatus.NOT_VALIDATED,
    messages: [],
    endpoint: "skillexperience",
  },
  {
    id: 4,
    name: "Summary",
    status: ValidationStatus.NOT_VALIDATED,
    messages: [],
    endpoint: "summary",
  },
]

export const confirmedExperienceSteps: ValidationStep[] = [
  {
    id: 1,
    name: "Business",
    status: ValidationStatus.VALID,
    messages: [],
    endpoint: "business",
  },
  {
    id: 2,
    name: "Timeframe",
    status: ValidationStatus.VALID,
    messages: [],
    endpoint: "timeframe",
  },
  {
    id: 3,
    name: "Skills",
    status: ValidationStatus.VALID,
    messages: [],
    endpoint: "skillexperience",
  },
  {
    id: 4,
    name: "Summary",
    status: ValidationStatus.VALID,
    messages: [],
    endpoint: "summary",
  },
]

export const initialSideProjectSteps: ValidationStep[] = [
  {
    id: 1,
    name: "Business",
    status: ValidationStatus.NOT_VALIDATED,
    messages: [],
    endpoint: "business",
  },
  {
    id: 2,
    name: "Timeframe",
    status: ValidationStatus.NOT_VALIDATED,
    messages: [],
    endpoint: "timeframe",
  },
  {
    id: 3,
    name: "Skills",
    status: ValidationStatus.NOT_VALIDATED,
    messages: [],
    endpoint: "skills",
  },
  {
    id: 4,
    name: "Summary",
    status: ValidationStatus.NOT_VALIDATED,
    messages: [],
    endpoint: "summary",
  },
]

export const confirmedSideProjectSteps: ValidationStep[] = [
  {
    id: 1,
    name: "Business",
    status: ValidationStatus.VALID,
    messages: [],
    endpoint: "business",
  },
  {
    id: 2,
    name: "Timeframe",
    status: ValidationStatus.VALID,
    messages: [],
    endpoint: "timeframe",
  },
  {
    id: 3,
    name: "Skills",
    status: ValidationStatus.VALID,
    messages: [],
    endpoint: "skills",
  },
  {
    id: 4,
    name: "Summary",
    status: ValidationStatus.VALID,
    messages: [],
    endpoint: "summary",
  },
]
