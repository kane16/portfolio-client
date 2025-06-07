export interface PortfolioState {
  resume?: Resume,
  resumeFilter: ResumeFilter,
  isLoading: boolean
  error?: string
  isError?: boolean
  isSuccess?: boolean
}

export interface Resume {
  id?: number
  shortDescription: string
  dataMatrix: DataMatrix
}

export interface ResumeFilter {
  searchText: string
  skill?: string
  business?: string
}

export interface DataMatrix {
  name: string
  values: string[]
}
