import { lazy } from "react"

export const Home = lazy(() => import("../features/home/Home"))
export const ErrorPage = lazy(() => import("../features/error/ErrorPage"))
export const Login = lazy(() => import("../features/login/Login"))
export const EditMain = lazy(
  () => import("../features/edit/overview/EditOverview"),
)
export const CreateShortcut = lazy(
  () => import("../features/edit/main/shortcut/CreateShortcut"),
)
export const EditShortcut = lazy(
  () => import("../features/edit/main/shortcut/EditShortcut"),
)
export const EditResume = lazy(() => import("../features/edit/main/EditResume"))
export const ResumeSkills = lazy(
  () => import("../features/edit/main/skills/ResumeSkills"),
)
export const ResumeExperiencesList = lazy(
  () => import("../features/edit/main/experience/ResumeExperiencesList"),
)
export const ResumeExperience = lazy(
  () => import("../features/edit/main/experience/ResumeExperience"),
)
export const ResumeSideProjectList = lazy(
  () => import("../features/edit/main/side-project/ResumeSideProjectList"),
)
export const ResumeSideProject = lazy(
  () => import("../features/edit/main/side-project/ResumeSideProject"),
)
export const HobbyList = lazy(
  () => import("../features/edit/main/hobby/HobbyList"),
)
export const LanguageList = lazy(
  () => import("../features/edit/main/language/LanguageList"),
)
export const EducationList = lazy(
  () => import("../features/edit/main/education/EducationList"),
)
export const UploadImage = lazy(
  () => import("../features/upload-image/UploadImage"),
)
