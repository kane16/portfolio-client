export interface User {
  jwtDesc: string
  username: string
  email: string
  roles: string[]
}

export interface PortfolioState {
  resume?: Resume
  resumeFilter: ResumeFilter
  isLoading: boolean
  error?: string
  isError?: boolean
  isSuccess?: boolean
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
