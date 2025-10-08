import type { ImageOption } from "../shared/model/image-option"
import type { LoginUser } from "../sites/login/Login"
import {
  type ResumeHistory,
  type Resume,
  type ResumeFilter,
  type User,
  type ResumeShortcut,
  NotFoundResponse,
  type Skill,
  type ValidationResponse,
  type Timespan,
  type Project,
} from "./model"

async function apiError(response: Response, fallback: string): Promise<Error> {
  const data = await response.clone().json()
  const message = data?.error || response.statusText || fallback
  return new Error(message)
}

export const fetchResumeFilters = async (): Promise<ResumeFilter> => {
  const response = await fetch("/api/portfolio/filter/all")
  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch resume filter")
  }
  const data: ResumeFilter = await response.json()
  return data
}

export const fetchDefaultResume = async (): Promise<Resume> => {
  const response = await fetch("/api/portfolio/cv", { method: "POST" })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch portfolio")
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
    throw await apiError(response, "Failed to login")
  }
  const data: User = await response.json()
  sessionStorage.setItem("user", JSON.stringify(data))
  return data
}

export const getResumeById = async (
  token: string,
  id: number,
): Promise<Resume | NotFoundResponse> => {
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

export const getServerImages = async (): Promise<ImageOption[]> => {
  const response = await fetch("/api/auth/images", {
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch images")
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

export const fetchUserSkills = async (token: string): Promise<Skill[]> => {
  const response = await fetch("/api/portfolio/skills", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch skills")
  }

  return response.json()
}

export const fetchResumeSkills = async (
  token: string,
  resumeId: number,
): Promise<Skill[]> => {
  const response = await fetch(`/api/portfolio/skills/resume/${resumeId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 200) {
    throw await apiError(
      response,
      `Failed to fetch skills for resume ${resumeId}`,
    )
  }

  return response.json()
}

export const fetchUserDomains = async (token: string): Promise<string[]> => {
  const response = await fetch("/api/portfolio/skills/domains", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch skill domains")
  }

  return response.json()
}

export const addDomain = async (
  token: string,
  domain: string,
): Promise<string> => {
  const response = await fetch("/api/portfolio/skills/domains", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: domain,
  })
  if (response.status !== 201) {
    throw await apiError(response, "Failed to add skill domain")
  }

  return response.json()
}

export const addSkillToResume = async (
  token: string,
  resumeId: number,
  skill: Skill,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/skills`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skill),
    },
  )
  if (response.status !== 201) {
    throw await apiError(response, "Failed to add skill to resume")
  }

  return response.json()
}

export const editSkillOnResume = async (
  token: string,
  resumeId: number,
  initialSkillName: string,
  skill: Skill,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/skills/${initialSkillName}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skill),
    },
  )
  if (response.status !== 200) {
    throw await apiError(response, "Failed to edit skill on resume")
  }

  return response.json()
}

export const deleteSkillFromResume = async (
  token: string,
  resumeId: number,
  skillName: string,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/skills/${skillName}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  )
  if (response.status !== 200) {
    throw await apiError(response, "Failed to delete skill from resume")
  }

  return response.json()
}

export const validateResumne = async (
  token: string,
  resumeId: number,
): Promise<ValidationResponse> => {
  const response = await fetch(`/api/portfolio/resume/${resumeId}/validate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate resume")
  }

  return response.json()
}

export const validateBusiness = async (
  token: string,
  business: string,
  resumeId: number,
): Promise<ValidationResponse> => {
  const response = await fetch(`/api/portfolio/resume/${resumeId}/validate/experience/business`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: business,
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate business")
  }

  return response.json()
}

export const validateTimeframe = async (
  token: string,
  timespan: Timespan,
  resumeId: number,
): Promise<ValidationResponse> => {
  const response = await fetch(`/api/portfolio/resume/${resumeId}/validate/experience/timeframe`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(timespan),
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate timeframe")
  }

  return response.json()
}

export const validateSkillsExperience = async (
  token: string,
  skills: Skill[],
  resumeId: number,
): Promise<ValidationResponse> => {
  const response = await fetch(`/api/portfolio/resume/${resumeId}/validate/experience/skills`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skills),
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate skills experience")
  }

  return response.json()
}

export const validateExperience = async (
  token: string,
  resumeId: number,
  experience: Project
): Promise<ValidationResponse> => {
  const response = await fetch(`/api/portfolio/resume/${resumeId}/validate/experience`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(experience),
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate experience summary")
  }

  return response.json()
}

export const saveExperience = async (
  token: string,
  resumeId: number,
  experience: Project
): Promise<boolean> => {
  const response = await fetch(`/api/portfolio/resume/edit/${resumeId}/experience`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(experience),
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to save experience summary")
  }

  return response.json()
}

export const deleteExperience = async (
  token: string,
  resumeId: number,
  experienceId: number
): Promise<boolean> => {
  const response = await fetch(`/api/portfolio/resume/edit/${resumeId}/experience/${experienceId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to delete experience")
  }

  return response.json()
}