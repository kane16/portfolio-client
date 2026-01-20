import type { Selectable } from "../../shared/model/selectable"

export interface Timespan {
  start: string
  end?: string
}

export interface Institution {
  name: string
  city: string
  country: string
}

export enum EducationType {
  DEGREE = "DEGREE",
  CERTIFICATE = "CERTIFICATE",
  COURSE = "COURSE",
  TRAINING = "TRAINING",
  OTHER = "OTHER",
}

export class EducationTypeContainer implements Selectable {
  name: string
  educationType: EducationType

  constructor(name: string, education: EducationType) {
    this.name = name
    this.educationType = education
  }
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
