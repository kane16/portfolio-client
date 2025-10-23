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
export const ResumeExperiencesList = lazy(
  () => import("../sites/edit/main/experience/ResumeExperiencesList"),
)
export const ResumeExperience = lazy(
  () => import("../sites/edit/main/experience/ResumeExperience"),
)
export const ResumeSideProjectList = lazy(
  () => import("../sites/edit/main/side-project/ResumeSideProjectList"),
)
export const ResumeSideProject = lazy(
  () => import("../sites/edit/main/side-project/ResumeSideProject"),
)
export const HobbyList = lazy(
  () => import("../sites/edit/main/hobby/HobbyList"),
)
export const LanguageList = lazy(
  () => import("../sites/edit/main/language/LanguageList"),
)
export const EducationList = lazy(
  () => import("../sites/edit/main/education/EducationList"),
)
