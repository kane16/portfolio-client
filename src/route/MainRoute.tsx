import { createBrowserRouter } from "react-router-dom"
import { EditInit, EditMain, ErrorPage, Home, Login } from "./LazyRoutes"
import { Suspense } from "react"
import RoutesFallback from "./RoutesFallback"
import ProtectedRoute from "../sites/login/ProtectedRoute"

export const mainRoutes = createBrowserRouter([
  {
    path: "/edit",
    element: (
      <Suspense fallback={<RoutesFallback />}>
        <ProtectedRoute internalElement={<EditMain />} />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<RoutesFallback />}>
        <ErrorPage />
      </Suspense>
    ),
  },
  {
    path: "/edit/init",
    element: (
      <Suspense fallback={<RoutesFallback />}>
        <ProtectedRoute internalElement={<EditInit />} />
      </Suspense>
    ),
  },
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
  },
])
