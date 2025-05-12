import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PortfolioState, Resume } from "./model";


export const initialState: PortfolioState = {
  isLoading: false,
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
      }
    }
  }
)

export const { pullPortfolio, pullPortfolioSuccess, pullPortfolioFailure } = portfolioSlice.actions
export const portfolioReducer = portfolioSlice.reducer