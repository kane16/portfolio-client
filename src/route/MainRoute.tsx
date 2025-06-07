import { Route, Routes } from "react-router-dom"
import { Home } from "./LazyRoutes"
import { Suspense } from "react"
import RoutesFallback from "./RoutesFallback"

export const mainRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback={<RoutesFallback />}>
          <Home />
        </Suspense>
      }
    />
  </Routes>
)
