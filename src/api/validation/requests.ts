import { apiError } from "../error"
import type {
  Experience,
  Project,
  ResumeValidationResponse,
  SimpleValidationResponse,
  Skill,
  Timespan,
} from "./model"

export const validateResume = async (
  token: string,
  resumeId: number,
): Promise<ResumeValidationResponse> => {
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
): Promise<SimpleValidationResponse> => {
  const response = await fetch(
    `/api/portfolio/resume/${resumeId}/validate/experience/business`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: business,
    },
  )
  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate business")
  }

  return response.json()
}

export const validateTimeframe = async (
  token: string,
  timespan: Timespan,
  resumeId: number,
): Promise<SimpleValidationResponse> => {
  const response = await fetch(
    `/api/portfolio/resume/${resumeId}/validate/experience/timeframe`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timespan),
    },
  )
  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate timeframe")
  }

  return response.json()
}

export const validateSkillsExperience = async (
  token: string,
  skills: Skill[],
  resumeId: number,
): Promise<SimpleValidationResponse> => {
  const response = await fetch(
    `/api/portfolio/resume/${resumeId}/validate/experience/skills`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skills),
    },
  )
  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate skills experience")
  }

  return response.json()
}

export const validateExperience = async (
  token: string,
  resumeId: number,
  experience: Experience,
): Promise<SimpleValidationResponse> => {
  const response = await fetch(
    `/api/portfolio/resume/${resumeId}/validate/experience`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experience),
    },
  )
  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate experience summary")
  }

  return response.json()
}

export const validateSideProjectBusiness = async (
  token: string,
  business: string,
  resumeId: number,
): Promise<SimpleValidationResponse> => {
  const response = await fetch(
    `/api/portfolio/resume/${resumeId}/validate/sideProjects/business`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: business,
    },
  )

  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate side project business")
  }

  return response.json()
}

export const validateSideProjectTimeframe = async (
  token: string,
  timespan: Timespan,
  resumeId: number,
): Promise<SimpleValidationResponse> => {
  const response = await fetch(
    `/api/portfolio/resume/${resumeId}/validate/sideProjects/timeframe`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timespan),
    },
  )

  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate side project timeframe")
  }

  return response.json()
}

export const validateSideProjectSkills = async (
  token: string,
  skills: Skill[],
  resumeId: number,
): Promise<SimpleValidationResponse> => {
  const response = await fetch(
    `/api/portfolio/resume/${resumeId}/validate/sideProjects/skills`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skills),
    },
  )

  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate side project skills")
  }

  return response.json()
}

export const validateSideProject = async (
  token: string,
  resumeId: number,
  sideProject: Project,
): Promise<SimpleValidationResponse> => {
  const response = await fetch(
    `/api/portfolio/resume/${resumeId}/validate/sideProjects`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sideProject),
    },
  )

  if (response.status !== 200) {
    throw await apiError(response, "Failed to validate side project summary")
  }

  return response.json()
}

export const fetchFieldConstraints = async (
  token: string,
): Promise<import("./model").FieldConstraint[]> => {
  const response = await fetch("/api/portfolio/constraints", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch field constraints")
  }

  return response.json()
}
