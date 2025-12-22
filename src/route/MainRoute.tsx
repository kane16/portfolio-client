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
  UploadImage,
} from "./LazyRoutes"
import { Suspense } from "react"
import RoutesFallback from "./RoutesFallback"
import ProtectedRoute from "../sites/login/ProtectedRoute"
import App from "../App"

export const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback={<RoutesFallback />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RoutesFallback />}>
            <Home />
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<RoutesFallback />}>
            <ErrorPage />
          </Suspense>
        )
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<RoutesFallback />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "upload-image",
        element: (
          <Suspense fallback={<RoutesFallback />}>
            <ProtectedRoute internalElement={<UploadImage />} />
          </Suspense>
        ),
      },
      {
        path: "edit",
        element: (
          <Suspense fallback={<RoutesFallback />}>
            <ProtectedRoute internalElement={<EditMain />} />
          </Suspense>
        ),
      },
      {
        path: "edit/init",
        element: (
          <Suspense fallback={<RoutesFallback />}>
            <ProtectedRoute internalElement={<CreateShortcut />} />
          </Suspense>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <Suspense fallback={<RoutesFallback />}>
            <ProtectedRoute internalElement={<EditResume />} />
          </Suspense>
        ),
        children: [
          {
            index: true,
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
                index: true,
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
                index: true,
                element: (
                  <Suspense fallback={<RoutesFallback />}>
                    <ProtectedRoute
                      internalElement={<ResumeExperiencesList />}
                    />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "side-projects",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<RoutesFallback />}>
                    <ProtectedRoute
                      internalElement={<ResumeSideProjectList />}
                    />
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
    ],
  },
])
