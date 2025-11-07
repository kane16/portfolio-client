import { useTranslation } from "react-i18next"
import { useAuth } from "../../../../login/use-auth"
import { Navigate, useParams } from "react-router-dom"
import { useResumeById, useValidateTimeframe } from "../../../../../api/queries"
import {
  NotFoundResponse,
  ValidationStatus,
  type Timespan,
} from "../../../../../api/model"
import ExperienceTimeframeRow from "./ExperienceTimeframeRow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import TimeframeDialog from "./TimeframeDialog"
import Button from "../../../../../shared/Button"
import { useExperienceValidationState } from "../../../../../app/experience-validation-state-hook"
import toast from "react-hot-toast"

export default function ExperienceTimeframeList() {
  const { authData } = useAuth()
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id ?? "", 10)
  const { data: resume } = useResumeById(authData.user!.jwtDesc!, resumeId)
  const { validationState, mutateValidationState } =
    useExperienceValidationState()
  const [timeframe, setTimeframe] = useState<Timespan | undefined>(
    validationState.experience.timespan,
  )
  const [addTimeframe, setAddTimeframe] = useState(false)
  const isValid = validationState.steps[1]!.status === ValidationStatus.VALID
  const validateTrigger = useValidateTimeframe(t, resumeId)

  async function validate() {
    const validationResponse = await validateTrigger.mutateAsync({
      token: authData.user!.jwtDesc,
      timespan: timeframe!,
    })
    const newSteps = validationState.steps.map((step) =>
      step.id === validationState.activeStep
        ? {
            ...step,
            experience: {
              ...validationState.experience,
              timespan: timeframe,
            },
            status: validationResponse.isValid
              ? ValidationStatus.VALID
              : ValidationStatus.INVALID,
          }
        : step,
    )
    const newState = {
      ...validationState,
      steps: newSteps,
    }
    if (!validationResponse.isValid) {
      validationResponse.errors.forEach((message) => {
        toast.error(message)
      })
    }
    mutateValidationState(newState)
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
          {resume.workHistory.map((experience, index) => (
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
      {!isValid && timeframe && (
        <div className="flex w-full justify-center">
          <Button onClick={validate} text={t("common.validate")} />
        </div>
      )}
    </div>
  )
}
