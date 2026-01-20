import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type { TFunction } from "i18next"
import type {
  Experience,
  FieldConstraint,
  Project,
  Skill,
  Timespan,
} from "./model"
import {
  fetchFieldConstraints,
  validateBusiness,
  validateResume,
  validateSideProject,
  validateSideProjectBusiness,
  validateSideProjectSkills,
  validateSideProjectTimeframe,
  validateSkillsExperience,
  validateTimeframe,
} from "./requests"

export function useValidateResume(token: string, resumeId: number) {
  return useSuspenseQuery({
    queryKey: ["validateResume", resumeId],
    queryFn: () => validateResume(token, resumeId),
    retry: false,
  })
}

export function useValidateBusiness(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  return useMutation({
    mutationFn: ({ token, business }: { token: string; business: string }) => {
      return validateBusiness(token, business, resumeId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("validateBusiness.businessValidated"))
    },
  })
}

export function useValidateTimeframe(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  return useMutation({
    mutationFn: ({
      token,
      timespan,
    }: {
      token: string
      timespan: Timespan
    }) => {
      return validateTimeframe(token, timespan, resumeId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("validateTimeframe.timeframeValidated"))
    },
  })
}

export function useValidateSkillExperience(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  return useMutation({
    mutationFn: ({ token, skills }: { token: string; skills: Skill[] }) => {
      return validateSkillsExperience(token, skills, resumeId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("validateSkillExperience.skillsValidated"))
    },
  })
}

export function useValidateExperience(
  t: TFunction<"translation", undefined>,
  resumeId: number,
  token: string,
) {
  return useMutation({
    mutationFn: ({ experience }: { experience: Experience }) => {
      return validateSkillsExperience(token, experience.skills, resumeId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("experience.validationSuccess"))
    },
  })
}

export function useValidateSideProjectBusiness(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  return useMutation({
    mutationFn: ({ token, business }: { token: string; business: string }) => {
      return validateSideProjectBusiness(token, business, resumeId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("validateSideProject.businessValidated"))
    },
  })
}

export function useValidateSideProjectTimeframe(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  return useMutation({
    mutationFn: ({
      token,
      timespan,
    }: {
      token: string
      timespan: Timespan
    }) => {
      return validateSideProjectTimeframe(token, timespan, resumeId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("validateSideProject.timeframeValidated"))
    },
  })
}

export function useValidateSideProjectSkills(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  return useMutation({
    mutationFn: ({ token, skills }: { token: string; skills: Skill[] }) => {
      return validateSideProjectSkills(token, skills, resumeId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("validateSideProject.skillsValidated"))
    },
  })
}

export function useValidateSideProject(
  t: TFunction<"translation", undefined>,
  resumeId: number,
  token: string,
) {
  return useMutation({
    mutationFn: ({ sideProject }: { sideProject: Project }) => {
      return validateSideProject(token, resumeId, sideProject)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("sideProject.validationSuccess"))
    },
  })
}

export function useFieldConstraints(token: string) {
  return useSuspenseQuery<FieldConstraint[]>({
    queryKey: ["constraints"],
    queryFn: () => fetchFieldConstraints(token),
  })
}
