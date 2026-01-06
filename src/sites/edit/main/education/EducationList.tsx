import type { Education } from "../../../../api/model"
import { NotFoundResponse } from "../../../../api/model"
import { useDeleteEducation, useResumeById } from "../../../../api/queries"
import { useTranslation } from "react-i18next"
import { Navigate, useParams } from "react-router-dom"
import { useAuth } from "../../../login/use-auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import EducationForm from "./EducationForm"
import { useState } from "react"
import EducationRow from "./EducationRow"

export default function EducationList() {
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id || "0", 10)
  const { token } = useAuth()
  const { t } = useTranslation()
  const [addEducationOpened, setAddEducationOpened] = useState(false)
  const [editEducationOpened, setEditEducationOpened] = useState(false)
  const [educationToEdit, setEducationToEdit] = useState<Education | undefined>(
    undefined,
  )

  const deleteEducationAction = useDeleteEducation(t, resumeId, token!)
  const { data: resume } = useResumeById(token!, resumeId)

  if (resume instanceof NotFoundResponse) {
    return <Navigate to={"/edit"} />
  }

  const educationList: Education[] = resume.education

  if (addEducationOpened) {
    return <EducationForm setFormInProgress={setAddEducationOpened} />
  }

  if (editEducationOpened) {
    return (
      <EducationForm
        setFormInProgress={setEditEducationOpened}
        education={educationToEdit}
      />
    )
  }

  function setEditEducation(education: Education) {
    setEducationToEdit(education)
    setEditEducationOpened(true)
  }

  function deleteEducation(educationId: number) {
    deleteEducationAction.mutate({
      educationId,
    })
  }

  return (
    <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="min-w-full table-fixed text-left align-middle">
          <thead className="bg-[var(--surface-hover)]/80 text-[var(--foreground-muted)]">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeEducation.title")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeEducation.institution")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeEducation.field")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeEducation.period")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {educationList.length > 0 ? (
              educationList.map((education) => (
                <EducationRow
                  education={education}
                  setEditingEducation={setEditEducation}
                  deleteEducation={deleteEducation}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-6 text-center text-sm text-[var(--foreground-muted)]"
                >
                  {t("resumeEducation.empty")}
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="bg-[var(--surface-hover)]/70">
            <tr>
              <td
                colSpan={4}
                className="px-6 py-3 text-sm text-[var(--foreground-muted)]"
              >
                {t("resumeEducation.footer")}
              </td>
              <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
                <FontAwesomeIcon
                  icon={faAdd}
                  className="cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
                  onClick={() => setAddEducationOpened(true)}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
