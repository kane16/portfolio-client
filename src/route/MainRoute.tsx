import { createBrowserRouter } from "react-router-dom"
import {
  CreateShortcut,
  EditMain,
  EditResume,
  EditShortcut,
  ErrorPage,
  Home,
  Login,
  ResumeSkills,
  ResumeExperiencesList,
  HobbyList,
  LanguageList,
  ResumeSideProjectList,
  EducationList,
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
        path: "languages",
        element: (
          <Suspense fallback={<RoutesFallback />}>
            <ProtectedRoute internalElement={<LanguageList />} />
          </Suspense>
        ),
      },
      {
        path: "education",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<RoutesFallback />}>
                <ProtectedRoute internalElement={<EducationList />} />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "experience",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<RoutesFallback />}>
                <ProtectedRoute internalElement={<ResumeExperiencesList />} />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "side-projects",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<RoutesFallback />}>
                <ProtectedRoute internalElement={<ResumeSideProjectList />} />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "hobbies",
        element: (
          <Suspense fallback={<RoutesFallback />}>
            <ProtectedRoute internalElement={<HobbyList />} />
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
