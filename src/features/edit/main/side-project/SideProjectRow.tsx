import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import type { Project } from "../../../../api"
import { useTranslation } from "react-i18next"

export interface SideProjectRowProps {
  project: Project
  editProject: (project: Project) => void
  deleteProject: (project: Project) => void
}

export default function SideProjectRow({
  project,
  editProject,
  deleteProject,
}: SideProjectRowProps) {
  const { t } = useTranslation()

  return (
    <tr className="odd:bg-[var(--background-alt)]/40 transition-colors even:bg-transparent hover:bg-[var(--surface-hover)]">
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {project.position}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {project.business}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {project.timespan?.start ?? ""}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {project.timespan?.end
          ? project.timespan.end
          : t("resumeSideProject.timeframe.present")}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        <div className="flex gap-4">
          <FontAwesomeIcon
            icon={faPen}
            className="cursor-pointer rounded bg-blue-500 p-1.5 text-sm text-white transition duration-300 hover:bg-blue-700"
            onClick={() => editProject(project)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="cursor-pointer rounded bg-red-500 p-1.5 text-sm text-white transition duration-300 hover:bg-red-700"
            onClick={() => deleteProject(project)}
          />
        </div>
      </td>
    </tr>
  )
}
