import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type { TFunction } from "i18next"
import type { Language } from "./model"
import {
  addLanguageToResume,
  deleteLanguageFromResume,
  editLanguageOnResume,
} from "./requests"

export function useAddLanguageToResume(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      token,
      language,
    }: {
      token: string
      language: Language
    }) => {
      return addLanguageToResume(token, resumeId, language)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("addLanguage.languageAddedToResume"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}

export function useEditLanguageInResume(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      token,
      language,
      languageId,
    }: {
      token: string
      initialLanguageName: string
      language: Language
      languageId: number
    }) => {
      return editLanguageOnResume(token, resumeId, language, languageId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("editLanguage.languageUpdated"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}

export function useDeleteLanguageFromResume(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      token,
      languageId,
    }: {
      token: string
      languageId: number
    }) => {
      return deleteLanguageFromResume(token, resumeId, languageId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("deleteLanguage.languageDeleted"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}
