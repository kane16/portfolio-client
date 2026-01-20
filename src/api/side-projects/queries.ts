import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type { TFunction } from "i18next"
import type { Project } from "./model"
import { addSideProject, deleteSideProject, editSideProject } from "./requests"

export function useAddSideProject(
  t: TFunction<"translation", undefined>,
  resumeId: number,
  token: string,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ sideProject }: { sideProject: Project }) => {
      return addSideProject(token, resumeId, sideProject)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("saveSideProject.sideProjectSaved"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}

export function useEditSideProject(
  t: TFunction<"translation", undefined>,
  resumeId: number,
  token: string,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ sideProject }: { sideProject: Project }) => {
      return editSideProject(token, resumeId, sideProject.id!, sideProject)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("saveSideProject.sideProjectSaved"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}

export function useDeleteSideProject(
  t: TFunction<"translation", undefined>,
  resumeId: number,
  token: string,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ sideProjectId }: { sideProjectId: number }) => {
      return deleteSideProject(token, resumeId, sideProjectId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("deleteSideProject.sideProjectDeleted"))
      queryClient.invalidateQueries({ queryKey: ["resume", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}
