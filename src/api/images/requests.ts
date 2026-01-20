import type { ImageOption } from "../../shared/model/image-option"
import { apiError } from "../error"

export const getServerImages = async (): Promise<ImageOption[]> => {
  const response = await fetch("/api/bos/images/", {
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch images")
  }

  return response.json()
}

export const uploadImage = async (
  token: string,
  imageName: string,
  imageData: File,
): Promise<boolean> => {
  const formData = new FormData()
  formData.append("name", imageName)
  formData.append("file", imageData)

  const response = await fetch("/api/bos/images/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (response.status !== 201) {
    throw await apiError(response, "Failed to upload image")
  }

  return response.json()
}
