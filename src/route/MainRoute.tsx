import { createBrowserRouter } from "react-router-dom"
import { ErrorPage, Home, Login } from "./LazyRoutes"
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
  {
    path: "/login",
    element: (
      <Suspense fallback={<RoutesFallback />}>
        <Login />
      </Suspense>
    ),
  }
])
