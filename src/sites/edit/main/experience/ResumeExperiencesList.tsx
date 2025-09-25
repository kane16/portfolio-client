import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useResumeById } from "../../../../api/queries"
import { useAuth } from "../../../login/use-auth"
import { useTranslation } from "react-i18next"
import { NotFoundResponse } from "../../../../api/model"
import ExperienceRow from "./ExperienceRow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"

export default function ResumeExperiencesList() {
  const navigate = useNavigate()
  const { authData } = useAuth()
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const resumeId = id ? parseInt(id, 10) : null
  const { data: resume } = useResumeById(authData.user!.jwtDesc!, resumeId!)

  if (resume instanceof NotFoundResponse) {
    return <Navigate to={"/edit"} />
  }

  return (
    <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="min-w-full table-fixed text-left align-middle">
          <thead className="bg-[var(--surface-hover)]/80 text-[var(--foreground-muted)]">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeExperience.position")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeExperience.business")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeExperience.timeframe.from")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeExperience.timeframe.to")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {resume.workHistory.map((experience, index) => (
              <ExperienceRow key={index} experience={experience} />
            ))}
          </tbody>
          <tfoot className="bg-[var(--surface-hover)]/70">
            {
              <tr>
                <td
                  className="px-6 py-3 text-sm text-[var(--foreground-muted)]"
                  colSpan={2}
                >
                  Experience summary
                </td>
                <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
                  {resume.workHistory.length} experiences
                </td>
                <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
                  <FontAwesomeIcon
                    icon={faAdd}
                    className="cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
                    onClick={() => navigate("add")}
                  />
                </td>
              </tr>
            }
          </tfoot>
        </table>
      </div>
    </div>
  )
}
