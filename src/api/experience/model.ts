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
