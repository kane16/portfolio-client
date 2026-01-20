import { useTranslation } from "react-i18next"
import { useAuth } from "../../../../login/use-auth"
import { Navigate, useParams } from "react-router-dom"
import { useResumeById } from "../../../../../api/portfolio"
import { useValidateTimeframe } from "../../../../../api/validation"
import {
  NotFoundResponse,
  type Experience,
  type Timespan,
} from "../../../../../api"
import ExperienceTimeframeRow from "./ExperienceTimeframeRow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import TimeframeDialog from "./TimeframeDialog"
import Button from "../../../../../shared/Button"

interface ExperienceTimeframeListProps {
  experience: Experience
  onTimeframeChanged: (startDate: string, endDate: string | undefined) => void
}

export default function ExperienceTimeframeList({
  experience,
  onTimeframeChanged,
}: ExperienceTimeframeListProps) {
  const { token } = useAuth()
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id ?? "", 10)
  const { data: resume } = useResumeById(token!, resumeId)
  const [timeframe, setTimeframe] = useState<Timespan | undefined>(
    experience.timespan,
  )
  const [addTimeframe, setAddTimeframe] = useState(false)
  const validateTrigger = useValidateTimeframe(t, resumeId)

  async function validateAndSave() {
    const validationResponse = await validateTrigger.mutateAsync({
      token: token!,
      timespan: timeframe!,
    })
    if (validationResponse.isValid) {
      onTimeframeChanged(timeframe!.start, timeframe?.end)
    }
  }

  function deleteTimeframe() {
    setTimeframe(undefined)
  }

  if (Number.isNaN(resumeId)) {
    return <Navigate to={"/edit"} />
  }

  if (resume instanceof NotFoundResponse) {
    return <Navigate to={"/edit"} />
  }

  function isSaveVisible() {
    return (
      experience.timespan?.start !== timeframe?.start ||
      experience.timespan?.end !== timeframe?.end
    )
  }

  return (
    <div className="flex w-full max-w-4xl flex-col justify-between overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
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
          {resume.workHistory
            .filter((t) => t.timespan?.start !== timeframe?.start)
            .map((experience, index) => (
              <ExperienceTimeframeRow
                key={`${experience.position}-${experience.timespan!.start}-${index}`}
                timeframe={experience.timespan!}
              />
            ))}
          {timeframe && (
            <ExperienceTimeframeRow
              key={`${timeframe.start}-${timeframe.end}`}
              timeframe={timeframe}
              deleteTimeframe={deleteTimeframe}
            />
          )}
        </tbody>
        <tfoot className="bg-[var(--surface-hover)]/70">
          <tr>
            <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
              {t("resumeExperience.timeframe.summary.title")}
            </td>
            <td className="px-6 py-3 text-left text-sm text-[var(--foreground-muted)]">
              {t("resumeExperience.timeframe.summary.count", {
                count: resume.workHistory.length,
              })}
            </td>
            <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
              {!timeframe && (
                <FontAwesomeIcon
                  icon={faAdd}
                  className="cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
                  onClick={() => setAddTimeframe(true)}
                />
              )}
            </td>
          </tr>
        </tfoot>
      </table>
      {addTimeframe && (
        <TimeframeDialog
          dialogTitle={t("resumeExperience.timeframe.add")}
          initialTimeframe={{ start: new Date().toISOString() }}
          isOpened={() => addTimeframe}
          setOpened={setAddTimeframe}
          setTimeframe={setTimeframe}
        />
      )}
      {isSaveVisible() && timeframe && (
        <div className="flex w-full justify-center">
          <Button
            onClick={validateAndSave}
            text={t("common.validateAndSave")}
          />
        </div>
      )}
    </div>
  )
}
