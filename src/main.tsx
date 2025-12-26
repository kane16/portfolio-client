import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./i18n"
import { RouterProvider } from "react-router-dom"
import { mainRoutes } from "./route/MainRoute"

const queryClient = new QueryClient()

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient
  }
}

if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.__TANSTACK_QUERY_CLIENT__ = queryClient
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={mainRoutes} />
    </QueryClientProvider>
  </StrictMode>,
)
