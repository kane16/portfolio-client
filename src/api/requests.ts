import type { ImageOption } from "../shared/model/image-option"
import type { LoginUser } from "../sites/login/Login"
import { type ResumeHistory, type Resume, type ResumeFilter, type User, type PortfolioShortcut, NotFoundResponse } from "./model"

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

export const getHistory = async (token: string): Promise<ResumeHistory | NotFoundResponse> => {
  const response = await fetch("/api/portfolio/portfolio/history", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status === 404) {
    return new NotFoundResponse("Portfolio history not found")
  }

  if (response.status !== 200) {
    throw new Error("Failed to fetch portfolio history")
  }

  return await response.json()
}

export const initPortfolio = async (token: string, shortcut: PortfolioShortcut): Promise<ResumeHistory> => {
  const response = await fetch("/api/portfolio/portfolio/edit/init", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shortcut),
  })
  if (response.status !== 201) {
    throw new Error("Failed to initialize portfolio")
  }

  return response.json()
}

export const getServerImages = async (): Promise<ImageOption[]> => {
  const response = await fetch("/api/auth/images", {
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 200) {
    throw new Error("Failed to fetch images")
  }

  return response.json()
}