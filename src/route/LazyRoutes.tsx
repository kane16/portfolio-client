import { lazy } from "react"

export const Home = lazy(() => import("../sites/home/Home"))
export const ErrorPage = lazy(() => import("../sites/error/ErrorPage"))
export const Login = lazy(() => import("../sites/login/Login"))
export const EditMain = lazy(
  () => import("../sites/edit/overview/EditOverview"),
)
export const CreateShortcut = lazy(
  () => import("../sites/edit/main/shortcut/CreateShortcut"),
)
export const EditShortcut = lazy(
  () => import("../sites/edit/main/shortcut/EditShortcut"),
)
export const EditResume = lazy(() => import("../sites/edit/main/EditResume"))
export const ResumeSkills = lazy(
  () => import("../sites/edit/main/skills/ResumeSkills"),
)
export const ResumeExperiences = lazy(
  () => import("../sites/edit/main/experience/ResumeExperiencesList"),
)
export const AddResumeExperience = lazy(
  () => import("../sites/edit/main/experience/ResumeExperience"),
)
