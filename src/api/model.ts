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
  sideProjects: Project[]
  workHistory: Project[]
  hobbies: string[]
}

export interface Skill {
  name: string
  description?: string
  level?: number
  domains: string[]
}

export interface Language {
  name: string
  level: string
}

export interface Project {
  position: string
  business: string
  summary: string
  description: string
  timespan: Timespan
  skills: Skill[]
}

export interface Timespan {
  start: string
  end: string
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

export interface ValidationResponse {
  isValid: boolean
  progress: number
  validationResults: ValidationDomainResponse[]
}

export interface ValidationDomainResponse {
  domain: ResumeDomain
  validationStatus: ValidationStatus
  errors: string[]
}

export enum ResumeDomain {
  SHORTCUT = "SHORTCUT",
  SKILLS = "SKILLS",
  EXPERIENCES = "EXPERIENCES",
  SIDE_PROJECTS = "SIDE_PROJECTS",
  HOBBIES = "HOBBIES",
  LANGUAGES = "LANGUAGES",
}

export interface ValidationStep {
  id: number
  name: string
  state: ValidationStatus
  messages: string[]
  activateStep: () => void
}

export interface ValidationResult {
  isValid: boolean
  steps: ValidationStep[]
}
