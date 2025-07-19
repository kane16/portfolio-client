import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { PortfolioState, Resume, ResumeFilter } from "./model"

export const initialState: PortfolioState = {
  isLoading: false,
  resumeFilter: {
    technologyDomain: [],
    skills: [],
    business: [],
  },
}

export const fetchPortfolio = async (): Promise<Resume> => {
  const response = await fetch("/api/portfolio/portfolio", { method: "POST" })
  if (response.status !== 200) {
    throw new Error("Failed to fetch portfolio")
  }

  const data: Resume = await response.json()
  return data
}

export const fetchResumeFilter = async (): Promise<ResumeFilter> => {
  const response = await fetch("/api/portfolio/filter/all")
  if (response.status !== 200) {
    throw new Error("Failed to fetch resume filter")
  }

  const data: ResumeFilter = await response.json()
  return data
}

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    pullPortfolio: (state) => {
      state.isLoading = true
    },
    pullPortfolioSuccess: (state, action: PayloadAction<Resume>) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.resume = action.payload
    },
    pullPortfolioFailure: (state) => {
      state.isLoading = false
      state.isSuccess = false
    },
    pullResumeFilter: (state) => {
      state.isLoading = true
    },
    pullResumeFilterSuccess: (state, action: PayloadAction<ResumeFilter>) => {
      state.isLoading = false
      state.resumeFilter = action.payload
    },
    pullResumeFilterFailure: (state) => {
      state.isLoading = false
      state.isError = true
    },
    changeResumeFilter: (state, action: PayloadAction<ResumeFilter>) => {
      state.resumeFilter = action.payload
    },
  },
})

export const {
  pullPortfolio,
  pullPortfolioSuccess,
  pullPortfolioFailure,
  changeResumeFilter,
  pullResumeFilter,
  pullResumeFilterFailure,
  pullResumeFilterSuccess,
} = portfolioSlice.actions
export const portfolioReducer = portfolioSlice.reducer
