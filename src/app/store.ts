import { configureStore } from "@reduxjs/toolkit"
import { portfolioReducer } from "../features/portfolio/portfolio-slice"

const datePattern = /\d+-\d+-\d+T\d+:\d+:\d+\.\d+Z/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dateSerializationMiddleware = () => (next: any) => (action: any) => {
  // Serialize Date objects in the action payload
  if (action.payload) {
    action.payload = JSON.parse(
      JSON.stringify(action.payload, (_, value) => {
        const isDate = typeof value === "string" && datePattern.test(value)
        return isDate ? value.split("T")[0] : value
      }),
    )
  }

  return next(action)
}

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dateSerializationMiddleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
