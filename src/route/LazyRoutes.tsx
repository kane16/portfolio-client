import { lazy } from "react"

export const Home = lazy(() => import("../home/Home"))
export const ErrorPage = lazy(() => import("../error/ErrorPage"))
export const Login = lazy(() => import("../auth/Login"))