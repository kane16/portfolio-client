import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { Experience } from "../../../../api/model"
import { useTranslation } from "react-i18next"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export interface ExperienceRowProps {
  experience: Experience
  deleteExperience: (experience: Experience) => void
}

export default function ExperienceRow({ experience, deleteExperience }: ExperienceRowProps) {
  const { t } = useTranslation()

  return (
    <tr className="odd:bg-[var(--background-alt)]/40 transition-colors even:bg-transparent hover:bg-[var(--surface-hover)]">
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {experience.position}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {experience.business}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {experience.timespan!.start}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {experience.timespan!.end
          ? experience.timespan!.end
          : t("resumeExperience.timeframe.present")}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {
          <FontAwesomeIcon
            icon={faTrash}
            className="cursor-pointer rounded bg-red-500 p-1.5 text-sm text-white transition duration-300 hover:bg-red-700"
            onClick={() => deleteExperience(experience)}
          />
        }
      </td>
    </tr>
  )
}
