import { Navigate, useParams } from "react-router-dom"
import { useDeleteSideProject, useResumeById } from "../../../../api/queries"
import { useAuth } from "../../../login/use-auth"
import { useTranslation } from "react-i18next"
import {
  NotFoundResponse,
  confirmedSideProjectSteps,
  initialSideProjectSteps,
  type Project,
} from "../../../../api/model"
import SideProjectRow from "./SideProjectRow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import ResumeSideProject from "./ResumeSideProject"
import { useState } from "react"

export default function ResumeSideProjectList() {
  const { token } = useAuth()
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const resumeId = id ? parseInt(id, 10) : null
  const { data: resume } = useResumeById(token!, resumeId!)
  const deleteSideProjectTrigger = useDeleteSideProject(t, resumeId!, token!)
  const [addSideProjectOpened, setAddSideProjectOpened] = useState(false)
  const [editSideProjectOpened, setEditSideProjectOpened] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  if (resume instanceof NotFoundResponse) {
    return <Navigate to={"/edit"} />
  }

  async function deleteProject(project: Project) {
    await deleteSideProjectTrigger.mutateAsync({
      sideProjectId: project.id!,
    })
  }

  function editProject(project: Project) {
    setSelectedProject(project)
    setEditSideProjectOpened(true)
  }

  function addProject() {
    setAddSideProjectOpened(true)
  }

  if (addSideProjectOpened) {
    return (
      <ResumeSideProject
        initialSideProject={{
          position: "",
          business: "",
          summary: "",
          description: "",
          skills: [],
        }}
        steps={initialSideProjectSteps}
        activeStepId={1}
        closeEdit={() => setAddSideProjectOpened(false)}
        resumeId={resumeId!}
      />
    )
  }

  if (editSideProjectOpened && selectedProject) {
    return (
      <ResumeSideProject
        initialSideProject={selectedProject}
        steps={confirmedSideProjectSteps}
        activeStepId={1}
        closeEdit={() => setEditSideProjectOpened(false)}
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
