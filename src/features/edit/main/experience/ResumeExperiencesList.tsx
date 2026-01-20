import { Navigate, useParams } from "react-router-dom"
import { useResumeById } from "../../../../api/portfolio"
import { useDeleteExperience } from "../../../../api/experience"
import { useAuth } from "../../../login/use-auth"
import { useTranslation } from "react-i18next"
import { NotFoundResponse, type Experience } from "../../../../api"
import {
  confirmedExperienceSteps,
  initialExperienceSteps,
} from "../../../../api/validation"
import ExperienceRow from "./ExperienceRow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import ResumeExperience from "./ResumeExperience"

export default function ResumeExperiencesList() {
  const { token } = useAuth()
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const resumeId = id ? parseInt(id, 10) : null
  const { data: resume } = useResumeById(token!, resumeId!)
  const deleteExperienceTrigger = useDeleteExperience(t, resumeId!, token!)
  const [addExperienceOpened, setAddExperienceOpened] = useState(false)
  const [editExperienceOpened, setEditExperienceOpened] = useState(false)
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null)

  if (resume instanceof NotFoundResponse) {
    return <Navigate to={"/edit"} />
  }

  async function deleteExperience(experience: Experience) {
    await deleteExperienceTrigger.mutateAsync({
      experienceId: experience.id!,
    })
  }

  async function editExperience(experience: Experience) {
    setSelectedExperience(experience)
    setEditExperienceOpened(true)
  }

  async function addExperience() {
    setAddExperienceOpened(true)
  }

  if (addExperienceOpened) {
    return (
      <ResumeExperience
        initialExperience={{
          position: "",
          business: "",
          summary: "",
          description: "",
          skills: [],
        }}
        steps={initialExperienceSteps}
        activeStepId={1}
        closeEdit={() => setAddExperienceOpened(false)}
        resumeId={resumeId!}
      />
    )
  }

  if (editExperienceOpened && selectedExperience) {
    return (
      <ResumeExperience
        initialExperience={selectedExperience}
        steps={confirmedExperienceSteps}
        activeStepId={1}
        closeEdit={() => setEditExperienceOpened(false)}
        resumeId={resumeId!}
      />
    )
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
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("common.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {resume.workHistory.map((experience, index) => (
              <ExperienceRow
                key={index}
                experience={experience}
                editExperience={editExperience}
                deleteExperience={deleteExperience}
              />
            ))}
          </tbody>
          <tfoot className="bg-[var(--surface-hover)]/70">
            {
              <tr>
                <td
                  className="px-6 py-3 text-sm text-[var(--foreground-muted)]"
                  colSpan={2}
                >
                  {t("resumeExperience.summary.title")}
                </td>
                <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]"></td>
                <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
                  {t("resumeExperience.summary.count", {
                    count: resume.workHistory.length,
                  })}
                </td>
                <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
                  <FontAwesomeIcon
                    icon={faAdd}
                    className="cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
                    onClick={addExperience}
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
