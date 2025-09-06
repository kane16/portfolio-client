import { createBrowserRouter } from "react-router-dom"
import { EditMain, EditResume, ErrorPage, Home, Login } from "./LazyRoutes"
import { Suspense } from "react"
import RoutesFallback from "./RoutesFallback"
import ProtectedRoute from "../sites/login/ProtectedRoute"
import CreateShortcut from "../sites/edit/shortcut/CreateShortcut"
import EditShortcut from "../sites/edit/shortcut/EditShortcut"

export const mainRoutes = createBrowserRouter([
  {
    path: "/edit/:id",
    element: (
      <Suspense fallback={<RoutesFallback />}>
        <ProtectedRoute internalElement={<EditResume />} />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<RoutesFallback />}>
            <ProtectedRoute internalElement={<EditShortcut />} />
          </Suspense>
        ),
      },
    ],
  },
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
        <ProtectedRoute internalElement={<CreateShortcut />} />
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
