import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import type {
  Experience,
  Language,
  Resume,
  ResumeFilter,
  ResumeShortcut,
  Skill,
  Timespan,
} from "./model"
import {
  addDomain,
  addSkillToResume,
  addHobbyToResume,
  addLanguageToResume,
  deleteExperience,
  deleteSkillFromResume,
  deleteHobbyFromResume,
  deleteLanguageFromResume,
  editPortfolio,
  editSkillOnResume,
  editLanguageOnResume,
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
  addExperience,
  unpublishResume,
  validateBusiness,
  validateSkillsExperience,
  validateTimeframe,
  validateResume,
  editExperience,
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

export function useAddDomain(t: TFunction<"translation", undefined>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ token, domain }: { token: string; domain: string }) => {
      return addDomain(token, domain)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("addDomain.domainAdded"))
      queryClient.invalidateQueries({ queryKey: ["skillDomains"] })
    },
  })
}

export function useAddSkillToResume(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ token, skill }: { token: string; skill: Skill }) => {
      return addSkillToResume(token, resumeId, skill)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("addSkill.skillAddedToResume"))
      queryClient.invalidateQueries({ queryKey: ["resumeSkills", resumeId] })
      queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    },
  })
}

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

export function useEditSkillInResume(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      token,
      initialSkillName,
      skill,
    }: {
      token: string
      initialSkillName: string
      skill: Skill
    }) => {
      return editSkillOnResume(token, resumeId, initialSkillName, skill)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("editSkill.skillUpdated"))
      queryClient.invalidateQueries({ queryKey: ["resumeSkills", resumeId] })
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
      languageId
    }: {
      token: string
      initialLanguageName: string
      language: Language
      languageId: number
    }) => {
      return editLanguageOnResume(
        token,
        resumeId,
        language,
        languageId
      )
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

export function useDeleteResume(
  t: TFunction<"translation", undefined>,
  resumeId: number,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      token,
      skillName,
    }: {
      token: string
      skillName: string
    }) => {
      return deleteSkillFromResume(token, resumeId, skillName)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("deleteSkill.skillDeleted"))
      queryClient.invalidateQueries({ queryKey: ["resumeSkills", resumeId] })
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

export function useUserSkills(token: string) {
  return useQuery({
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
  return useQuery({
    queryKey: ["skillDomains"],
    queryFn: () => fetchUserDomains(token),
  })
}

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
