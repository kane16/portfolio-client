import { apiError } from "../error"

export const addHobbyToResume = async (
  token: string,
  resumeId: number,
  hobby: string,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/hobbies`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: hobby,
    },
  )
  if (response.status !== 201) {
    throw await apiError(response, "Failed to add hobby to resume")
  }

  return response.json()
}

export const deleteHobbyFromResume = async (
  token: string,
  resumeId: number,
  hobbyName: string,
): Promise<boolean> => {
  const response = await fetch(
    `/api/portfolio/resume/edit/${resumeId}/hobbies`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: hobbyName,
    },
  )
  if (response.status !== 200) {
    throw await apiError(response, "Failed to delete hobby from resume")
  }

  return response.json()
}
