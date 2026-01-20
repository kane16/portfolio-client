import { apiError } from "../error"
import type { Skill } from "./model"

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
