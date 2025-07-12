export interface PortfolioState {
  resume?: Resume
  resumeFilter: ResumeFilter
  isLoading: boolean
  error?: string
  isError?: boolean
  isSuccess?: boolean
}

export interface Resume {
  id?: number
  title: string
  description: string
  informations: ResumeSectionInfo[]
}

export interface ResumeFilter {
  searchText: string
  skill?: string
  business?: string
}

export interface ResumeSectionInfo {
  name: string
  values: ResumeEntryInfo[]
}

export interface ResumeEntryInfo {
  name: string
  description: string
}
