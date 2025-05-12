import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Theme } from "./model/theme"
import { ThemeState } from "./model/theme-state"

const initialTheme: ThemeState = { currentTheme: Theme.light }

const themeSlice = createSlice({
  name: "theme",
  initialState: initialTheme,
  reducers: {
    changeSiteTheme(state, action: PayloadAction<Theme>) {
      state.currentTheme = action.payload
    },
  },
})

export const { changeSiteTheme } = themeSlice.actions
export default themeSlice.reducer
