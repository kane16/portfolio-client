import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { initialState } from "./model"

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    failedWithMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    failedWithPopup: (state, action: PayloadAction<string>) => {
      state.popup = action.payload
    },
    clearError: (state) => {
      state.message = undefined
    },
    clearPopup: (state) => {
      state.popup = undefined
    },
  },
})

export const {
  failedWithMessage,
  failedWithPopup,
  clearError,
  clearPopup,
} = errorSlice.actions
export const errorReducer = errorSlice.reducer
