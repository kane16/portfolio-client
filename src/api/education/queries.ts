import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type { TFunction } from "i18next"
import type { Education } from "./model"
import { addEducation, deleteEducation, editEducation } from "./requests"

export function useAddEducation(
  t: TFunction<"translation", undefined>,
  resumeId: number,
  token: string,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ education }: { education: Education }) => {
      return addEducation(token, resumeId, education)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("saveEducation.educationSaved"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}

export function useEditEducation(
  t: TFunction<"translation", undefined>,
  resumeId: number,
  token: string,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ education }: { education: Education }) => {
      return editEducation(token, resumeId, education.id!, education)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("saveEducation.educationSaved"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}

export function useDeleteEducation(
  t: TFunction<"translation", undefined>,
  resumeId: number,
  token: string,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ educationId }: { educationId: number }) => {
      return deleteEducation(token, resumeId, educationId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("deleteEducation.educationDeleted"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}
