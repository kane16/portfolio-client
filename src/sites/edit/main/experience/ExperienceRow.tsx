import type { Project } from "../../../../api/model"

export interface ExperienceRowProps {
  experience: Project
}

export default function ExperienceRow({ experience }: ExperienceRowProps) {
  return (
    <tr className="odd:bg-[var(--background-alt)]/40 transition-colors even:bg-transparent hover:bg-[var(--surface-hover)]">
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {experience.position}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {experience.business}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {experience.timespan.start.toISOString().split("T")[0]}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {experience.timespan.end ? experience.timespan.end.toISOString().split("T")[0] : "Present"}
      </td>
    </tr>
  )
}
