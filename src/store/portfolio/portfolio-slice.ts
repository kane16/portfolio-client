import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { PortfolioState, Resume, ResumeFilter } from "./model"

export const initialState: PortfolioState = {
  isLoading: false,
  resumeFilter: {
    searchText: "",
    skill: undefined,
    business: undefined,
  },
}

export const portfolioSlice = createSlice(
  {
    name: 'portfolio',
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
      pullPortfolioFailure: (state, action: PayloadAction<string>) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.error = action.payload
      },
      changeResumeFilter: (state, action: PayloadAction<ResumeFilter>) => {
        state.resumeFilter = action.payload
      }
    }
  }
)

export const { pullPortfolio, pullPortfolioSuccess, pullPortfolioFailure, changeResumeFilter } = portfolioSlice.actions
export const portfolioReducer = portfolioSlice.reducer