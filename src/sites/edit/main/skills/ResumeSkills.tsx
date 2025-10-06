import { useState, type JSX } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { useDeleteResume, useResumeSkills } from "../../../../api/queries"
import { useAuth } from "../../../login/use-auth"
import { useParams } from "react-router-dom"
import SkillDialog from "./add/SkillDialog"
import { useTranslation } from "react-i18next"
import type { Skill } from "../../../../api/model"
import SkillListView from "./SkillsListView"

export default function ResumeSkills(): JSX.Element {
  const { t } = useTranslation()
  const { authData } = useAuth()
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id || "0")
  const { data: skills } = useResumeSkills(authData.user!.jwtDesc, resumeId)
  const [addSkillOpened, setAddSkillOpened] = useState(false)
  const [editSkill, setEditSkill] = useState<Skill | null>(null)
  const deleteSkill = useDeleteResume(t, resumeId)

  function deleteSkillFromResume(skill: Skill): void {
    deleteSkill.mutate({
      token: authData.user!.jwtDesc,
      skillName: skill.name,
    })
  }

  return (
    <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <SkillListView
          skills={skills}
          setEditSkill={setEditSkill}
          setDeleteSkill={deleteSkillFromResume}
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
      </div>
      {addSkillOpened && skills && (
        <SkillDialog
          dialogTitle={t("addSkill.addSkill")}
          initialSkill={{ name: "", level: 0, domains: [] }}
          userSkills={skills}
          isOpened={() => addSkillOpened}
          setOpened={setAddSkillOpened}
        />
      )}
      {editSkill && skills && (
        <SkillDialog
          dialogTitle={t("editSkill.editSkill")}
          initialSkill={editSkill}
          userSkills={skills}
          isOpened={() => !!editSkill}
          setOpened={(opened) => {
            if (!opened) setEditSkill(null)
          }}
        />
      )}
    </div>
  )
}
