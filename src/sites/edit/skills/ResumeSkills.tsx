import { useState, type JSX } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import SkillRow from "./SkillRow"
import { useResumeSkills } from "../../../api/queries"
import { useAuth } from "../../login/use-auth"
import { useParams } from "react-router-dom"
import AddSkillDialog from "./AddSkillDialog"
import { useTranslation } from "react-i18next"

export default function ResumeSkills(): JSX.Element {
  const { t } = useTranslation()
  const { authData } = useAuth()
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id || "0")
  const { data: skills } = useResumeSkills(authData.user!.jwtDesc, resumeId)
  const [addSkillOpened, setAddSkillOpened] = useState(false)

  return (
    <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="min-w-full table-fixed text-left align-middle">
          <thead className="bg-[var(--surface-hover)]/80 text-[var(--foreground-muted)]">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeSkills.skill")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeSkills.level")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeSkills.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {skills?.map((skill) => (
              <SkillRow key={skill.name} skill={skill} />
            ))}
          </tbody>
          <tfoot className="bg-[var(--surface-hover)]/70">
            <tr>
              <td
                colSpan={2}
                className="px-6 py-3 text-sm text-[var(--foreground-muted)]"
              >
                {t("resumeSkills.footer")}
              </td>
              <td className="px-6 py-4 text-sm">
                <FontAwesomeIcon
                  icon={faAdd}
                  className="cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
                  onClick={() => setAddSkillOpened(true)}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {addSkillOpened && <AddSkillDialog isOpened={() => addSkillOpened} setOpened={setAddSkillOpened} />}
    </div>
  )
}
