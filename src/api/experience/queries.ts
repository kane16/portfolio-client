import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type { TFunction } from "i18next"
import type { Experience } from "./model"
import { addExperience, deleteExperience, editExperience } from "./requests"

export function useAddExperience(
  t: TFunction<"translation", undefined>,
  resumeId: number,
  token: string,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ experience }: { experience: Experience }) => {
      return addExperience(token, resumeId, experience)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("saveExperience.experienceSaved"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}

export function useEditExperience(
  t: TFunction<"translation", undefined>,
  resumeId: number,
  token: string,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ experience }: { experience: Experience }) => {
      return editExperience(token, resumeId, experience.id!, experience)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("saveExperience.experienceSaved"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}

export function useDeleteExperience(
  t: TFunction<"translation", undefined>,
  resumeId: number,
  token: string,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ experienceId }: { experienceId: number }) => {
      return deleteExperience(token, resumeId, experienceId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("deleteExperience.experienceDeleted"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}
