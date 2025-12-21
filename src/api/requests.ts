import type { ImageOption } from "../shared/model/image-option"
import type { LoginUser } from "../sites/login/Login"
import {
  type ResumeHistory,
  type EditResume,
  type ResumeFilter,
  type User,
  type ResumeShortcut,
  NotFoundResponse,
  type Skill,
  type Language,
  type SimpleValidationResponse,
  type Timespan,
  type Experience,
  type Project,
  type ResumeValidationResponse,
  type Education,
  type Portfolio,
  type FieldConstraint,
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

export const fetchDefaultResume = async (): Promise<Portfolio> => {
  const response = await fetch("/api/portfolio/cv", { method: "POST" })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch portfolio")
  }
  const data: Portfolio = await response.json()
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

export const fetchFieldConstraints = async (
  token: string,
): Promise<FieldConstraint[]> => {
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
