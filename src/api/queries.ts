import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Resume, ResumeFilter, ResumeShortcut } from "./model"
import {
  editPortfolio,
  fetchDefaultResume,
  fetchResumeFilters,
  fetchUserByLoginData,
  getHistory,
  getResumeById,
  getServerImages,
  initPortfolio,
  unpublishResume,
} from "./requests"
import type { LoginUser } from "../sites/login/Login"
import { toast } from "react-hot-toast"
import type { TFunction } from "i18next"

export function useResumeFilters() {
  return useQuery<ResumeFilter>({
    queryKey: ["filters"],
    queryFn: () => fetchResumeFilters(),
    retry: false,
    throwOnError: true,
  })
}

export function useDefaultResume() {
  return useQuery<Resume>({
    queryKey: ["resume"],
    queryFn: () => fetchDefaultResume(),
    retry: false,
    throwOnError: true,
  })
}

export function useLogin() {
  return useMutation({
    mutationFn: (loginUser: LoginUser) => {
      return fetchUserByLoginData(loginUser)
    },
  })
}

export function useApplicationImages() {
  return useQuery({
    queryKey: ["images"],
    queryFn: getServerImages,
    retry: false,
  })
}

export function useResumeById(token: string, id: number) {
  return useQuery({
    queryKey: ["resume", id],
    queryFn: () => getResumeById(token, id),
    retry: false,
  })
}

export function useHistory(token: string) {
  return useQuery({
    queryKey: ["portfolioHistory"],
    queryFn: () => getHistory(token),
    throwOnError: true,
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

export function useEditPortfolioById(id: number, t: TFunction<"translation", undefined>) {
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
    mutationFn: ({ token, version }: { token: string; version: number }) => {
      return unpublishResume(token, version)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("editInit.portfolioUnpublished"))
      queryClient.invalidateQueries({ queryKey: ["portfolioHistory"] })
    },
  })
}