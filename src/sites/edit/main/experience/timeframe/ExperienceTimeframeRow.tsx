import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { Timespan } from "../../../../../api/model"
import { useTranslation } from "react-i18next"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export interface TimeframeRowProps {
  timeframe: Timespan
  deleteTimeframe?: () => void
}

export default function ExperienceTimeframeRow({
  timeframe,
  deleteTimeframe,
}: TimeframeRowProps) {
  const { t } = useTranslation()

  return (
    <tr className="odd:bg-[var(--background-alt)]/40 transition-colors even:bg-transparent hover:bg-[var(--surface-hover)]">
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {timeframe.start}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {timeframe.end
          ? timeframe.end
          : t("resumeExperience.timeframe.present")}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {deleteTimeframe && (
          <FontAwesomeIcon
            icon={faTrash}
            className="cursor-pointer rounded bg-red-500 p-1.5 text-sm text-white transition duration-300 hover:bg-red-700"
            onClick={deleteTimeframe}
          />
        )}
      </td>
    </tr>
  )
}
