import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { useSideProjectValidationState } from "../../../../../app/side-project-validation-state-hook"
import SkillListView from "../../skills/SkillsListView"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { ValidationStatus, type Skill } from "../../../../../api/model"
import Button from "../../../../../shared/Button"
import {
  useResumeSkills,
  useValidateSideProjectSkills,
} from "../../../../../api/queries"
import { useParams } from "react-router-dom"
import { useAuth } from "../../../../login/use-auth"
import SideProjectSkillDialog from "./SideProjectSkillDialog"
import toast from "react-hot-toast"

export default function SideProjectSkillsList() {
  const { id } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { authData } = useAuth()
  const { t } = useTranslation()
  const validationTrigger = useValidateSideProjectSkills(t, resumeId)
  const { validationState, mutateValidationState } =
    useSideProjectValidationState()
  const [skillDialogOpened, setSkillDialogOpened] = useState(false)
  const [editSkill, setEditSkill] = useState<Skill | undefined>(undefined)
  const { data: resumeSkills } = useResumeSkills(
    authData.user!.jwtDesc,
    resumeId,
  )
  const skills = validationState.project.skills
  const isValid =
    validationState.steps.find((step) => step.id === validationState.activeStep)
      ?.status === ValidationStatus.VALID

  function addSkillToProject(submittedAddSkill: Skill) {
    if (
      validationState.project.skills.find(
        (skill) => skill.name === submittedAddSkill.name,
      )
    ) {
      toast.error(t("sideProject.skillAlreadyAdded"))
      return
    }
    mutateValidationState({
      ...validationState,
      project: {
        ...validationState.project,
        skills: [...skills, submittedAddSkill],
      },
    })
  }

  function editSkillInProject(submittedEditSkill: Skill) {
    if (
      validationState.project.skills.find(
        (skill) => skill.name === submittedEditSkill.name,
      )
    ) {
      toast.error(t("sideProject.skillAlreadyAdded"))
      return
    }
    mutateValidationState({
      ...validationState,
      project: {
        ...validationState.project,
        skills: [
          ...skills.filter((skill) => skill.name !== editSkill?.name),
          submittedEditSkill,
        ],
      },
    })
    setEditSkill(undefined)
  }

  function deleteProjectSkill(skillToDelete: Skill) {
    mutateValidationState({
      ...validationState,
      project: {
        ...validationState.project,
        skills: skills.filter((skill) => skill.name !== skillToDelete.name),
      },
    })
  }

  async function validate() {
    const validationResult = await validationTrigger.mutateAsync({
      token: authData.user!.jwtDesc,
      skills,
    })
    mutateValidationState({
      ...validationState,
      steps: validationState.steps.map((step) =>
        step.id === validationState.activeStep
          ? {
              ...step,
              status: validationResult.isValid
                ? ValidationStatus.VALID
                : ValidationStatus.INVALID,
            }
          : step,
      ),
    })
    if (!validationResult.isValid) {
      toast.error(t("validateSideProject.skillsNotValid"))
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
        setDeleteSkill={deleteProjectSkill}
        footer={
          <tfoot className="bg-[var(--surface-hover)]/70">
            <tr>
              <td
                colSpan={2}
                className="px-6 py-3 text-sm text-[var(--foreground-muted)]"
              >
                {t("resumeSideProject.skills.footer")}
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
      {skillDialogOpened && (
        <SideProjectSkillDialog
          resumeSkills={resumeSkills || []}
          close={() => setSkillDialogOpened(false)}
          skillToEdit={editSkill}
          isOpened={() => skillDialogOpened}
          title={
            editSkill ? t("sideProject.editSkill") : t("sideProject.addSkill")
          }
          handleSkillSubmitted={
            editSkill ? editSkillInProject : addSkillToProject
          }
        />
      )}
    </div>
  )
}
