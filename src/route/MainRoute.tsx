import { createBrowserRouter } from "react-router-dom"
import { ErrorPage, Home } from "./LazyRoutes"
import { Suspense } from "react"
import RoutesFallback from "./RoutesFallback"

export const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<RoutesFallback />}>
        <Home />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<RoutesFallback />}>
        <ErrorPage />
      </Suspense>
    ),
  },
])
