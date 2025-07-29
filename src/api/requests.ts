import type { LoginUser } from "../auth/Login"
import type { Resume, ResumeFilter, User } from "./model"

export const fetchResumeFilters = async (): Promise<ResumeFilter> => {
  const response = await fetch("/api/portfolio/filter/all")
  if (response.status !== 200) {
    throw new Error("Failed to fetch resume filter")
  }

  const data: ResumeFilter = await response.json()
  return data
}

export const fetchPortfolio = async (): Promise<Resume> => {
  const response = await fetch("/api/portfolio/portfolio", { method: "POST" })
  if (response.status !== 200) {
    throw new Error("Failed to fetch portfolio")
  }

  const data: Resume = await response.json()
  return data
}

export const fetchUserByLoginData = async (
  loginUser: LoginUser,
): Promise<User> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(loginUser),
  })
  if (response.status !== 200) {
    throw new Error("Failed to login")
  }

  const data: User = await response.json()
  sessionStorage.setItem("user", JSON.stringify(data))
  return data
}
