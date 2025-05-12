export interface PortfolioState {
  resume?: Resume
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

export interface DataMatrix {
  name: string
  values: string[]
}
