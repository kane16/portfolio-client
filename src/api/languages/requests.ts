import { apiError } from "../error"
import type { Language } from "./model"

export const addLanguageToResume = async (
  token: string,
  resumeId: number,
  language: Language,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/languages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(language),
    },
  )

  if (response.status !== 201) {
    throw await apiError(response, "Failed to add language to resume")
  }

  return response.json()
}

export const editLanguageOnResume = async (
  token: string,
  resumeId: number,
  language: Language,
  languageId: number,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/languages/${languageId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(language),
    },
  )

  if (response.status !== 200) {
    throw await apiError(response, "Failed to edit language on resume")
  }

  return response.json()
}

export const deleteLanguageFromResume = async (
  token: string,
  resumeId: number,
  languageId: number,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/languages/${languageId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  )

  if (response.status !== 200) {
    throw await apiError(response, "Failed to delete language from resume")
  }

  return response.json()
}
