import type { JSX } from "react"
import type { ResumeVersion } from "../../../api/portfolio"
import Button from "../../../shared/Button"
import { useTranslation } from "react-i18next"

export default function ResumeEditHeadline({
  resumeVersion,
  isSelected,
  selectResume,
}: {
  resumeVersion: ResumeVersion
  isSelected: () => boolean
  selectResume: (id: ResumeVersion) => void
}): JSX.Element {
  const { t } = useTranslation()
  function getResumeVersionStylesForState(state: string): string {
    switch (state) {
      case "PUBLISHED":
        return `border-green-400 bg-green-400 hover:border-green-500 hover:bg-green-600 dark:border-green-500 dark:bg-green-500 dark:outline-none
        hover:dark:bg-green-700 hover:dark:border-green-600`
      default:
        return ""
    }
  }

  return (
    <div className="group">
      <div
        className={`absolute -mt-6 ${isSelected() ? "hidden" : ""} bg-[var(--surface-hover)]/95 pointer-events-none rounded-md border border-[var(--border)] p-1 text-sm text-[var(--foreground)] opacity-0 shadow-lg backdrop-blur-sm transition duration-500 group-hover:opacity-100`}
      >
        {resumeVersion.title}
      </div>
      <Button
        text={t("editOverview.resume", { id: resumeVersion.id })}
        onClick={() => selectResume(resumeVersion)}
        isSelected={isSelected}
        overrideStyles={`${getResumeVersionStylesForState(resumeVersion.state)} ${isSelected() ? "border-neutral-600 hover:border-neutral-600 dark:border-neutral-200 hover:dark:border-neutral-200" : ""}`}
      />
    </div>
  )
}
