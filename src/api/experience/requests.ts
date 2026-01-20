import { apiError } from "../error"
import type { Experience } from "./model"

export const addExperience = async (
  token: string,
  resumeId: number,
  experience: Experience,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/experience`,
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
    throw await apiError(response, "Failed to add experience summary")
  }

  return response.json()
}

export const editExperience = async (
  token: string,
  resumeId: number,
  experienceId: number,
  experience: Experience,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/experience/${experienceId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experience),
    },
  )
  if (response.status !== 200) {
    throw await apiError(response, "Failed to edit experience summary")
  }

  return response.json()
}

export const deleteExperience = async (
  token: string,
  resumeId: number,
  experienceId: number,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/experience/${experienceId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  )
  if (response.status !== 200) {
    throw await apiError(response, "Failed to delete experience")
  }

  return response.json()
}
