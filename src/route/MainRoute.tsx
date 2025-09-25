import { createBrowserRouter } from "react-router-dom"
import {
  CreateShortcut,
  EditMain,
  EditResume,
  EditShortcut,
  ErrorPage,
  Home,
  Login,
  AddResumeExperience,
  ResumeSkills,
  ResumeExperiences,
} from "./LazyRoutes"
import { Suspense } from "react"
import RoutesFallback from "./RoutesFallback"
import ProtectedRoute from "../sites/login/ProtectedRoute"

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
      {
        path: "skills",
        element: (
          <Suspense fallback={<RoutesFallback />}>
            <ProtectedRoute internalElement={<ResumeSkills />} />
          </Suspense>
        ),
      },
      {
        path: "experience",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<RoutesFallback />}>
                <ProtectedRoute internalElement={<ResumeExperiences />} />
              </Suspense>
            ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={<RoutesFallback />}>
                <ProtectedRoute internalElement={<AddResumeExperience />} />
              </Suspense>
            ),
          },
        ],
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
