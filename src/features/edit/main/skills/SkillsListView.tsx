import type { JSX } from "react"
import type { Skill } from "../../../../api/model"
import SkillRow from "./SkillRow"
import { useTranslation } from "react-i18next"

interface ExperienceSkillsListProps {
  skills: Skill[]
  footer: JSX.Element
  setEditSkill: (value: Skill) => void
  setDeleteSkill: (value: Skill) => void
}

export default function SkillListView({
  skills,
  footer,
  setEditSkill,
  setDeleteSkill
}: ExperienceSkillsListProps) {
  const { t } = useTranslation()

  return (
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
          <SkillRow
            key={skill.name}
            skill={skill}
            setEdit={setEditSkill}
            setDelete={setDeleteSkill}
          />
        ))}
      </tbody>
      {footer}
    </table>
  )
}
