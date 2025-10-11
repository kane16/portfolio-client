import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useExperienceValidationState } from "../../../../../app/experience-validation-state-hook"
import SkillListView from "../../skills/SkillsListView"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { ValidationStatus, type Skill } from "../../../../../api/model"
import Button from "../../../../../shared/Button"
import {
  useResumeSkills,
  useValidateSkillExperience,
} from "../../../../../api/queries"
import { useParams } from "react-router-dom"
import { useAuth } from "../../../../login/use-auth"
import ExperienceSkillDialog from "./ExperienceSkillDialog"
import toast from "react-hot-toast"

interface ExperienceSkillsListProps {
  nextStep: () => void
}

export default function ExperienceSkillsList({
  nextStep,
}: ExperienceSkillsListProps) {
  const { id } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { authData } = useAuth()
  const { t } = useTranslation()
  const validationTrigger = useValidateSkillExperience(t, resumeId)
  const { validationState, mutateValidationState } =
    useExperienceValidationState()
  const [skillDialogOpened, setSkillDialogOpened] = useState(false)
  const [editSkill, setEditSkill] = useState<Skill | undefined>(undefined)
  const { data: resumeSkills } = useResumeSkills(
    authData.user!.jwtDesc,
    resumeId,
  )
  const skills = validationState.experience.skills
  const isValid =
    validationState.steps.find((step) => step.id === validationState.activeStep)
      ?.status === ValidationStatus.VALID

  function addSkillToExperience(submittedAddSkill: Skill) {
    if (
      validationState.experience.skills.find(
        (s) => s.name === submittedAddSkill.name,
      )
    ) {
      toast.error(t("experience.skillAlreadyAdded"))
      return
    }
    mutateValidationState({
      ...validationState,
      experience: {
        ...validationState.experience,
        skills: [...skills, submittedAddSkill],
      },
    })
  }

  function editSkillInExperience(submittedEditSkill: Skill) {
    if (
      validationState.experience.skills.find(
        (s) => s.name === submittedEditSkill.name,
      )
    ) {
      toast.error(t("experience.skillAlreadyAdded"))
      return
    }
    mutateValidationState({
      ...validationState,
      experience: {
        ...validationState.experience,
        skills: [
          ...skills.filter((s) => s.name !== editSkill?.name),
          submittedEditSkill,
        ],
      },
    })
    setEditSkill(undefined)
  }

  function deleteExperienceSkill(skillToDelete: Skill) {
    mutateValidationState({
      ...validationState,
      experience: {
        ...validationState.experience,
        skills: skills.filter((skill) => skill.name !== skillToDelete.name),
      },
    })
  }

  async function validate() {
    const validationResult = await validationTrigger.mutateAsync({
      token: authData.user!.jwtDesc,
      skills: skills,
    })
    if (validationResult.isValid) {
      mutateValidationState({
        ...validationState,
        steps: validationState.steps.map((step) =>
          step.id === validationState.activeStep
            ? { ...step, status: ValidationStatus.VALID }
            : step,
        ),
      })
    } else {
      mutateValidationState({
        ...validationState,
        steps: validationState.steps.map((step) =>
          step.id === validationState.activeStep
            ? { ...step, status: ValidationStatus.INVALID }
            : step,
        ),
      })
      toast.error(t("validateSkillExperience.skillsNotValid"))
    }
  }

  function openEditSkill(skill: Skill) {
    setEditSkill(skill)
    setSkillDialogOpened(true)
  }

  return (
    <div className="flex w-full flex-col items-center justify-between">
      <SkillListView
        skills={skills}
        setEditSkill={openEditSkill}
        setDeleteSkill={deleteExperienceSkill}
        footer={
          <tfoot className="bg-[var(--surface-hover)]/70">
            <tr>
              <td
                colSpan={2}
                className="px-6 py-3 text-sm text-[var(--foreground-muted)]"
              >
                {t("resumeSkills.footer")}
              </td>
              <td className="px-6 py-4 text-sm">
                {skills && (
                  <FontAwesomeIcon
                    icon={faAdd}
                    className="cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
                    onClick={() => setSkillDialogOpened(true)}
                  />
                )}
              </td>
            </tr>
          </tfoot>
        }
      />
      {!isValid && (
        <Button
          text={t("common.validate")}
          onClick={validate}
          disabled={() => skills.length === 0}
        />
      )}
      {isValid && (
        <div className="flex w-full justify-end gap-4">
          <Button
            text={t("common.next")}
            overrideStyles="bg-green-700 border-green-300 hover:bg-green-600 hover:border-green-400"
            onClick={nextStep}
            disabled={() => skills.length === 0}
          />
        </div>
      )}
      {skillDialogOpened && (
        <ExperienceSkillDialog
          resumeSkills={resumeSkills || []}
          close={() => setSkillDialogOpened(false)}
          skillToEdit={editSkill}
          isOpened={() => skillDialogOpened}
          title={
            editSkill ? t("experience.editSkill") : t("experience.addSkill")
          }
          handleSkillSubmitted={
            editSkill ? editSkillInExperience : addSkillToExperience
          }
        />
      )}
    </div>
  )
}
