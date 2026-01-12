import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SkillListView from "../../skills/SkillsListView"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { type Experience, type Skill } from "../../../../../api/model"
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
  experience: Experience
  onSkillsChanged: (skills: Skill[]) => void
}

export default function ExperienceSkillsList({
  experience,
  onSkillsChanged,
}: ExperienceSkillsListProps) {
  const { id } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { token } = useAuth()
  const { t } = useTranslation()
  const validationTrigger = useValidateSkillExperience(t, resumeId)
  const [skillDialogOpened, setSkillDialogOpened] = useState(false)
  const [editSkill, setEditSkill] = useState<Skill | undefined>(undefined)
  const { data: resumeSkills } = useResumeSkills(token!, resumeId)
  const [skills, setSkills] = useState<Skill[]>(experience.skills)

  function addSkillToExperience(submittedAddSkill: Skill) {
    if (experience.skills.find((s) => s.name === submittedAddSkill.name)) {
      toast.error(t("experience.skillAlreadyAdded"))
      return
    } else {
      setSkills([...skills, submittedAddSkill])
    }
  }

  function editSkillInExperience(submittedEditSkill: Skill) {
    if (experience.skills.find((s) => s.name === submittedEditSkill.name)) {
      toast.error(t("experience.skillAlreadyAdded"))
      return
    } else {
      setSkills(
        skills.map((skill) =>
          skill.name === editSkill?.name ? submittedEditSkill : skill,
        ),
      )
    }
  }

  function deleteExperienceSkill(skillToDelete: Skill) {
    setSkills(skills.filter((skill) => skill.name !== skillToDelete.name))
  }

  function isSaveVisible() {
    return (
      skills.length !== experience.skills.length ||
      skills.some(
        (skill, index) => skill.name !== experience.skills[index]?.name,
      )
    )
  }

  async function validateAndSave() {
    const validationResult = await validationTrigger.mutateAsync({
      token: token!,
      skills: skills,
    })
    if (validationResult.isValid) {
      onSkillsChanged(skills)
    } else {
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
      {isSaveVisible() && (
        <Button
          text={t("common.validateAndSave")}
          onClick={validateAndSave}
          disabled={() => skills.length === 0}
        />
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
