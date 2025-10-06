import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useExperienceValidationState } from "../../../../../app/experience-validation-state-hook"
import SkillListView from "../../skills/SkillsListView"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { ValidationStatus, type Skill } from "../../../../../api/model"
import Button from "../../../../../shared/Button"
import { useResumeSkills } from "../../../../../api/queries"
import { useParams } from "react-router-dom"
import { useAuth } from "../../../../login/use-auth"

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
  const { validationState, mutateValidationState } =
    useExperienceValidationState()
  const skills = validationState.experience.skills
  const [addSkillOpened, setAddSkillOpened] = useState(false)
  const [editSkill, setEditSkill] = useState<Skill | undefined>(undefined)
  const { data: resumeSkills } = useResumeSkills(
    authData.user!.jwtDesc,
    resumeId,
  )
  const isValid =
    validationState.steps[validationState.activeStep]?.status ===
    ValidationStatus.VALID

  function deleteExperienceSkill(skillToDelete: Skill) {
    mutateValidationState({
      ...validationState,
      experience: {
        ...validationState.experience,
        skills: skills.filter((skill) => skill.name !== skillToDelete.name),
      },
    })
  }

  return (
    <div className="flex w-full flex-col items-center justify-between">
      <SkillListView
        skills={skills}
        setEditSkill={setEditSkill}
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
                    onClick={() => setAddSkillOpened(true)}
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
          onClick={() => console.log("validate")}
          disabled={() => skills.length === 0}
        />
      )}
      {isValid && (
        <Button
          text={t("common.next")}
          onClick={nextStep}
          disabled={() => skills.length === 0}
        />
      )}
      {addSkillOpened && <div>Add Skill Dialog Placeholder</div>}
    </div>
  )
}
