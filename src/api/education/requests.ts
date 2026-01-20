import { apiError } from "../error"
import type { Education } from "./model"

export const addEducation = async (
  token: string,
  resumeId: number,
  education: Education,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/education`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(education),
    },
  )

  if (response.status !== 201) {
    throw await apiError(response, "Failed to add education to resume")
  }

  return response.json()
}

export const editEducation = async (
  token: string,
  resumeId: number,
  educationId: number,
  education: Education,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/education/${educationId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(education),
    },
  )

  if (response.status !== 200) {
    throw await apiError(response, "Failed to edit education on resume")
  }

  return response.json()
}

export const deleteEducation = async (
  token: string,
  resumeId: number,
  educationId: number,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/education/${educationId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  )

  if (response.status !== 200) {
    throw await apiError(response, "Failed to delete education from resume")
  }

  return response.json()
}
