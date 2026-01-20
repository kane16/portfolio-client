import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type { TFunction } from "i18next"
import type { Portfolio, ResumeFilter, ResumeShortcut } from "./model"
import {
  editPortfolio,
  fetchDefaultResume as fetchDefaultPortfolio,
  fetchResumeFilters,
  getHistory,
  getResumeById,
  initPortfolio,
  publishResume,
  unpublishResume,
} from "./requests"

export function useResumeFilters() {
  return useSuspenseQuery<ResumeFilter>({
    queryKey: ["filters"],
    queryFn: () => fetchResumeFilters(),
    retry: false,
  })
}

export function useDefaultPortfolio() {
  return useSuspenseQuery<Portfolio>({
    queryKey: ["portfolio"],
    queryFn: () => fetchDefaultPortfolio(),
    retry: false,
  })
}

export function useResumeById(token: string, id: number) {
  return useSuspenseQuery({
    queryKey: ["resume", id],
    queryFn: () => getResumeById(token, id),
    retry: false,
  })
}

export function useHistory(token: string) {
  return useSuspenseQuery({
    queryKey: ["portfolioHistory"],
    queryFn: () => getHistory(token),
  })
}

export function useInitShortcut(t: TFunction<"translation", undefined>) {
  return useMutation({
    mutationFn: ({
      token,
      portfolio,
    }: {
      token: string
      portfolio: ResumeShortcut
    }) => {
      return initPortfolio(token, portfolio)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("editInit.portfolioInitialized"))
    },
  })
}

export function useEditResumeById(
  id: number,
  t: TFunction<"translation", undefined>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      token,
      portfolio,
    }: {
      token: string
      portfolio: ResumeShortcut
    }) => {
      return editPortfolio(token, portfolio, id)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("editShortcut.resumeUpdated"))
      queryClient.invalidateQueries({ queryKey: ["resume", id] })
    },
  })
}

export function useUnpublishResume(t: TFunction<"translation", undefined>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ token }: { token: string }) => {
      return unpublishResume(token)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("editOverview.portfolioUnpublished"))
      queryClient.invalidateQueries({ queryKey: ["portfolioHistory"] })
    },
  })
}

export function usePublishResume(t: TFunction<"translation", undefined>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      token,
      versionId,
    }: {
      token: string
      versionId: number
    }) => {
      return publishResume(token, versionId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("editOverview.portfolioPublished"))
      queryClient.invalidateQueries({ queryKey: ["portfolioHistory"] })
    },
  })
}
