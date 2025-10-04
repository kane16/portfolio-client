import type { Timespan } from "../../../../../api/model"
import { useTranslation } from "react-i18next"

export interface TimeframeRowProps {
  timeframe: Timespan
}

export default function ExperienceTimeframeRow({
  timeframe,
}: TimeframeRowProps) {
  const { t } = useTranslation()

  return (
    <tr className="odd:bg-[var(--background-alt)]/40 transition-colors even:bg-transparent hover:bg-[var(--surface-hover)]">
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {timeframe.start.toISOString().split("T")[0]}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {timeframe.end
          ? timeframe.end.toISOString().split("T")[0]
          : t("resumeExperience.timeframe.present")}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]"></td>
    </tr>
  )
}
