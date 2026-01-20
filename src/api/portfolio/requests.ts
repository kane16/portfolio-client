import { apiError } from "../error"
import { NotFoundResponse } from "./model"
import type {
  EditResume,
  Portfolio,
  ResumeFilter,
  ResumeHistory,
  ResumeShortcut,
} from "./model"

export const fetchResumeFilters = async (): Promise<ResumeFilter> => {
  const response = await fetch("/api/portfolio/filter/all")
  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch resume filter")
  }
  const data: ResumeFilter = await response.json()
  return data
}

export const fetchDefaultResume = async (): Promise<Portfolio> => {
  const response = await fetch("/api/portfolio/cv", { method: "POST" })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch portfolio")
  }
  const data: Portfolio = await response.json()
  return data
}

export const getResumeById = async (
  token: string,
  id: number,
): Promise<EditResume | NotFoundResponse> => {
  const response = await fetch(`/api/portfolio/resume/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status === 404) {
    return new NotFoundResponse("Portfolio not found")
  }

  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch portfolio")
  }

  return await response.json()
}

export const getHistory = async (
  token: string,
): Promise<ResumeHistory | NotFoundResponse> => {
  const response = await fetch("/api/portfolio/resume/history", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status === 404) {
    return new NotFoundResponse("Portfolio history not found")
  }

  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch portfolio history")
  }

  return await response.json()
}

export const initPortfolio = async (
  token: string,
  shortcut: ResumeShortcut,
): Promise<boolean> => {
  const response = await fetch("/api/portfolio/resume/edit/init", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shortcut),
  })
  if (response.status !== 201) {
    throw await apiError(response, "Failed to initialize portfolio")
  }

  return response.json()
}

export const editPortfolio = async (
  token: string,
  shortcut: ResumeShortcut,
  id: number,
): Promise<boolean> => {
  const response = await fetch(`/api/portfolio/resume/edit/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shortcut),
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to edit portfolio")
  }

  return response.json()
}

export const unpublishResume = async (token: string): Promise<boolean> => {
  const response = await fetch(`/api/portfolio/resume/edit/unpublish`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to unpublish resume")
  }

  return response.json()
}

export const publishResume = async (
  token: string,
  versionId: number,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${versionId}/publish`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  )
  if (response.status !== 200) {
    throw await apiError(response, "Failed to publish resume")
  }

  return response.json()
}
