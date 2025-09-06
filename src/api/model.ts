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
  VALID,
  INVALID,
  NOT_VALIDATED
}

export interface ValidationStep {
  id: number
  name: string
  state: ValidationStatus
  messages: string[]
  stepActivationFunction: () => void
}

export interface ValidationResult {
  isValid: boolean,
  steps: ValidationStep[]
}