import { lazy } from "react"

export const Home = lazy(() => import("../sites/home/Home"))
export const ErrorPage = lazy(() => import("../sites/error/ErrorPage"))
export const Login = lazy(() => import("../sites/login/Login"))
