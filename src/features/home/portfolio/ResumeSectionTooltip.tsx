import type { JSX } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

export type ResumeSectionTooltipProps = {
  icon: JSX.Element
  title: string
  description: string
  actionLabel: string
  onAction?: () => void
}

export default function ResumeSectionTooltip({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: ResumeSectionTooltipProps): JSX.Element {
  return (
    <div className="flex h-full flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm md:gap-3 md:p-4">
      <div className="flex items-center gap-2 text-base font-semibold text-[var(--foreground)] md:gap-3 md:text-lg">
        <div className="text-lg text-indigo-500 md:text-xl">{icon}</div>
        <span>{title}</span>
      </div>
      <p className="flex-1 whitespace-pre-wrap text-sm text-[var(--foreground-muted)]">
        {description}
      </p>
      <button
        type="button"
        className="group inline-flex items-center gap-2 self-start text-sm font-medium text-indigo-500 transition hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        onClick={onAction}
      >
        <span className="underline decoration-transparent transition group-hover:decoration-indigo-400">
          {actionLabel}
        </span>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="transition group-hover:translate-x-1"
        />
      </button>
    </div>
  )
}
