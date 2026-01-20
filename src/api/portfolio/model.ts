export class NotFoundResponse {
  message: string

  constructor(message: string) {
    this.message = message
  }
}

export interface Image {
  name: string
  src: string
}

export interface Timespan {
  start: string
  end?: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  timezone: string
}

export interface Institution {
  name: string
  city: string
  country: string
}

export interface Skill {
  name: string
  description?: string
  level?: number
  detail?: string
  domains: string[]
}

export enum EducationType {
  DEGREE = "DEGREE",
  CERTIFICATE = "CERTIFICATE",
  COURSE = "COURSE",
  TRAINING = "TRAINING",
  OTHER = "OTHER",
}

export interface Education {
  id?: number | null
  title: string
  institution: Institution
  timeframe: Timespan
  fieldOfStudy: string
  grade: number
  type: EducationType
  description?: string | null
  externalLinks: string[]
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

export type LanguageLevel = (typeof LANGUAGE_LEVELS)[number]

export interface Language {
  id?: number
  name: string
  level: LanguageLevel
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

export interface ResumeHistory {
  defaultPortfolio: ResumeVersion
  history: ResumeVersion[]
}

export interface ResumeShortcut {
  fullname: string
  title: string
  summary: string
  image: Image
  contact?: ContactInfo
}

export interface ResumeVersion {
  id: number
  title: string
  summary: string
  version: number
  state: string
}

export interface EditResume {
  id: number
  fullname: string
  contact: ContactInfo
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

export interface Portfolio {
  id: number
  fullname: string
  contact?: ContactInfo | null
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

export interface ResumeFilter {
  technologyDomain: string[]
  skills: string[]
  business: string[]
}
