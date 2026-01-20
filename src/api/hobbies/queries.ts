import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type { TFunction } from "i18next"
import { addHobbyToResume, deleteHobbyFromResume } from "./requests"

export function useAddHobbyToResume(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ token, hobby }: { token: string; hobby: string }) => {
      return addHobbyToResume(token, resumeId, hobby)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("addHobby.hobbyAddedToResume"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}

export function useDeleteHobbyFromResume(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      token,
      hobbyName,
    }: {
      token: string
      hobbyName: string
    }) => {
      return deleteHobbyFromResume(token, resumeId, hobbyName)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("deleteHobby.hobbyDeleted"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}
