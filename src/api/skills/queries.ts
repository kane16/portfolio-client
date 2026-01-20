import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type { TFunction } from "i18next"
import type { Skill } from "./model"
import {
  addDomain,
  addSkillToResume,
  deleteSkillFromResume,
  editSkillOnResume,
  fetchResumeSkills,
  fetchUserDomains,
  fetchUserSkills,
} from "./requests"

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

export function useDeleteSkillFromResume(
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
