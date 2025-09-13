import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import type { Resume, ResumeFilter, ResumeShortcut } from "./model"
import {
  editPortfolio,
  fetchDefaultResume,
  fetchResumeFilters,
  fetchResumeSkills,
  fetchUserByLoginData,
  fetchUserDomains,
  fetchUserSkills,
  getHistory,
  getResumeById,
  getServerImages,
  initPortfolio,
  publishResume,
  unpublishResume,
} from "./requests"
import type { LoginUser } from "../sites/login/Login"
import { toast } from "react-hot-toast"
import type { TFunction } from "i18next"

export function useResumeFilters() {
  return useSuspenseQuery<ResumeFilter>({
    queryKey: ["filters"],
    queryFn: () => fetchResumeFilters(),
    retry: false,
  })
}

export function useDefaultResume() {
  return useSuspenseQuery<Resume>({
    queryKey: ["resume"],
    queryFn: () => fetchDefaultResume(),
    retry: false,
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
  return useSuspenseQuery({
    queryKey: ["images"],
    queryFn: getServerImages,
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

export function useEditPortfolioById(
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
      console.log(error)
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

export function useUserSkills(token: string) {
  return useSuspenseQuery({
    queryKey: ["skills"],
    queryFn: () => fetchUserSkills(token),
  })
}

export function useResumeSkills(token: string, resumeId: number) {
  return useSuspenseQuery({
    queryKey: ["resumeSkills", resumeId],
    queryFn: () => fetchResumeSkills(token, resumeId),
  })
}

export function useSkillDomains(token: string) {
  return useSuspenseQuery({
    queryKey: ["skillDomains"],
    queryFn: () => fetchUserDomains(token)
  })
}