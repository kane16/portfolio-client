import type { JSX } from "react"
import type { Education, Institution, Timespan } from "../../../../api"
import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"

export interface EducationRowProps {
  education: Education
  setEditingEducation: (education: Education) => void
  deleteEducation: (educationId: number) => void
}

export default function EducationRow({
  education,
  setEditingEducation,
  deleteEducation,
}: EducationRowProps): JSX.Element {
  const { t } = useTranslation()

  const presentLabel = t("resumeExperience.timeframe.present")

  function formatLocation(institution: Institution | undefined): string {
    if (!institution) return ""
    const locationParts = [institution.city, institution.country].filter(
      (value) => value && value.trim().length > 0,
    )

    return locationParts.join(", ")
  }

  function formatTimeframe(
    timeframe: Timespan | undefined,
    presentLabel: string,
  ): string {
    if (!timeframe) return ""
    const start = timeframe.start ? timeframe.start : ""
    const end = timeframe.end ? timeframe.end : presentLabel

    if (!start) return end

    return `${start} - ${end}`
  }

  return (
    <tr
      key={`${education.title}-${education.institution?.name}-${education.timeframe?.start}`}
      className="odd:bg-[var(--background-alt)]/40 transition-colors even:bg-transparent hover:bg-[var(--surface-hover)]"
    >
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        <div className="font-medium">{education.title}</div>
        {education.type && (
          <div className="text-xs text-[var(--foreground-muted)]">
            {education.type}
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        <div className="font-medium">{education.institution?.name ?? ""}</div>
        <div className="text-xs text-[var(--foreground-muted)]">
          {formatLocation(education.institution)}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        <div>{education.fieldOfStudy}</div>
        {education.grade !== undefined && (
          <div className="text-xs text-[var(--foreground-muted)]">
            {t("resumeEducation.grade", { value: education.grade })}
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {formatTimeframe(education.timeframe, presentLabel)}
      </td>
      <td className="flex gap-4 px-6 py-4 text-sm text-[var(--foreground)]">
        <FontAwesomeIcon
          icon={faEdit}
          className="cursor-pointer rounded bg-blue-500 p-1.5 text-sm text-white transition duration-300 hover:bg-blue-700"
          onClick={() => setEditingEducation(education)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer rounded bg-red-500 p-1.5 text-sm text-white transition duration-300 hover:bg-red-700"
          onClick={() => deleteEducation(education.id!)}
        />
      </td>
    </tr>
  )
}
