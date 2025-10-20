import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useDeleteSideProject, useResumeById } from "../../../../api/queries"
import { useAuth } from "../../../login/use-auth"
import { useTranslation } from "react-i18next"
import { NotFoundResponse, type Project } from "../../../../api/model"
import SideProjectRow from "./SideProjectRow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import {
  sideProjectEmptyState,
  useSideProjectValidationState,
} from "../../../../app/side-project-validation-state-hook"

export default function ResumeSideProjectList() {
  const navigate = useNavigate()
  const { authData } = useAuth()
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const resumeId = id ? parseInt(id, 10) : null
  const { data: resume } = useResumeById(authData.user!.jwtDesc!, resumeId!)
  const deleteSideProjectTrigger = useDeleteSideProject(
    t,
    resumeId!,
    authData.user!.jwtDesc!,
  )
  const { mutateValidationState } = useSideProjectValidationState()

  if (resume instanceof NotFoundResponse) {
    return <Navigate to={"/edit"} />
  }

  async function deleteProject(project: Project) {
    await deleteSideProjectTrigger.mutateAsync({
      sideProjectId: project.id!,
    })
  }

  function editProject(project: Project) {
    navigate(`edit/${project.id}`)
  }

  function addProject() {
    sessionStorage.removeItem("new_side_project_state")
    mutateValidationState(sideProjectEmptyState)
    navigate("add")
  }

  return (
    <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="min-w-full table-fixed text-left align-middle">
          <thead className="bg-[var(--surface-hover)]/80 text-[var(--foreground-muted)]">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeSideProject.position")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeSideProject.business")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeSideProject.timeframe.from")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeSideProject.timeframe.to")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("common.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {resume.sideProjects.map((project, index) => (
              <SideProjectRow
                key={`${project.id ?? index}-${project.position}`}
                project={project}
                editProject={editProject}
                deleteProject={deleteProject}
              />
            ))}
          </tbody>
          <tfoot className="bg-[var(--surface-hover)]/70">
            <tr>
              <td
                className="px-6 py-3 text-sm text-[var(--foreground-muted)]"
                colSpan={2}
              >
                {t("resumeSideProject.summary.title")}
              </td>
              <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]"></td>
              <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
                {t("resumeSideProject.summary.count", {
                  count: resume.sideProjects.length,
                })}
              </td>
              <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
                <FontAwesomeIcon
                  icon={faAdd}
                  className="cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
                  onClick={addProject}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
