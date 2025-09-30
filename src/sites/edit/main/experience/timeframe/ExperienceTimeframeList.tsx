import { useTranslation } from "react-i18next"
import { useAuth } from "../../../../login/use-auth"
import { Navigate, useParams } from "react-router-dom"
import { useResumeById } from "../../../../../api/queries"
import { NotFoundResponse } from "../../../../../api/model"
import ExperienceTimeframeRow from "./ExperienceTimeframeRow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"

export default function ExperienceTimeframeList() {
  const { authData } = useAuth()
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id ?? "", 10)
  const { data: resume } = useResumeById(authData.user!.jwtDesc!, resumeId)

  if (Number.isNaN(resumeId)) {
    return <Navigate to={"/edit"} />
  }

  if (resume instanceof NotFoundResponse) {
    return <Navigate to={"/edit"} />
  }

  return (
    <div className="w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <table className="min-w-full table-fixed text-left align-middle">
        <thead className="bg-[var(--surface-hover)]/80 text-[var(--foreground-muted)]">
          <tr>
            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
              {t("resumeExperience.timeframe.from")}
            </th>
            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
              {t("resumeExperience.timeframe.to")}
            </th>
            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
              {t("resumeSkills.actions")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {resume.workHistory.map((experience, index) => (
            <ExperienceTimeframeRow
              key={`${experience.position}-${experience.timespan.start}-${index}`}
              timeframe={experience.timespan}
            />
          ))}
        </tbody>
        <tfoot className="bg-[var(--surface-hover)]/70">
          <tr>
            <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
              Timeframe summary
            </td>
            <td className="px-6 py-3 text-left text-sm text-[var(--foreground-muted)]">
              {resume.workHistory.length} entries
            </td>
            <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
              <FontAwesomeIcon
                icon={faAdd}
                className="cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
                onClick={() => console.log()}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
