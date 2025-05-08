import { configureStore } from "@reduxjs/toolkit"

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

export const makeStore = () => {
  return configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dateSerializationMiddleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
export type RootState = AppStore["getState"]
