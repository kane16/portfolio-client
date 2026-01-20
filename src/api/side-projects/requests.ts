import { apiError } from "../error"
import type { Project } from "./model"

export const addSideProject = async (
  token: string,
  resumeId: number,
  sideProject: Project,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/sideProjects`,
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
    throw await apiError(response, "Failed to add side project")
  }

  return response.json()
}

export const editSideProject = async (
  token: string,
  resumeId: number,
  sideProjectId: number,
  sideProject: Project,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/sideProjects/${sideProjectId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sideProject),
    },
  )

  if (response.status !== 200) {
    throw await apiError(response, "Failed to edit side project")
  }

  return response.json()
}

export const deleteSideProject = async (
  token: string,
  resumeId: number,
  sideProjectId: number,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/sideProjects/${sideProjectId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  )

  if (response.status !== 200) {
    throw await apiError(response, "Failed to delete side project")
  }

  return response.json()
}
