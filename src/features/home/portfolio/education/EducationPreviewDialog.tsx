import type { JSX } from "react"
import { useTranslation } from "react-i18next"
import type { Education } from "../../../../api/model"
import { capitalize } from "../../../../app/utils"
import ThemedDialog from "../../../../shared/ThemedDialog"

type EducationPreviewDialogProps = {
  isOpen: boolean
  onClose: () => void
  education: Education[]
}

function formatLocation(institution?: Education["institution"]): string {
  if (!institution) return ""
  const parts = [institution.city, institution.country]
    .map((value) => (value ? value.trim() : ""))
    .filter((value) => value.length > 0)
  return parts.join(", ")
}

function formatTimeframe(
  timeframe: Education["timeframe"],
  presentLabel: string,
): string {
  if (!timeframe) return ""
  const start = timeframe.start ? timeframe.start.trim() : ""
  const end = timeframe.end ? timeframe.end.trim() : ""
  const formattedStart = start ? formatMonthYear(start) : ""
  const formattedEnd = end ? formatMonthYear(end) : ""
  const endLabel = formattedEnd || presentLabel

  if (!formattedStart) return formattedEnd || endLabel
  if (!endLabel) return formattedStart
  return `${formattedStart} - ${endLabel}`
}

function formatMonthYear(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${month}.${year}`
}

function formatEducationType(type?: Education["type"]): string {
  if (!type) return ""
  return type
    .split("_")
    .map((segment) => capitalize(segment.toLowerCase()))
    .join(" ")
}

export default function EducationPreviewDialog({
  isOpen,
  onClose,
  education,
}: EducationPreviewDialogProps): JSX.Element {
  const { t } = useTranslation()
  const presentLabel = t("resumeExperience.timeframe.present")
  const closeLabel = t("common.close")
  const emptyLabel = t("portfolio.resumeCard.educationDialog.empty")

  return (
    <ThemedDialog
      open={() => isOpen}
      onClose={onClose}
      title={t("portfolio.resumeCard.educationDialog.title")}
      footer={
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            onClick={onClose}
          >
            {closeLabel}
          </button>
        </div>
      }
    >
      {education.length === 0 ? (
        <p className="text-sm text-[var(--foreground-muted)]">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {education.map((entry, index) => {
            const location = formatLocation(entry.institution)
            const timeframe = formatTimeframe(entry.timeframe, presentLabel)
            const typeLabel = formatEducationType(entry.type)
            const hasGrade =
              entry.grade !== undefined &&
              entry.grade !== null &&
              !Number.isNaN(entry.grade)
            const links = (entry.externalLinks ?? [])
              .map((link) => link.trim())
              .filter((link) => link.length > 0)
            const key = entry.id ?? `${entry.title}-${index}`

            return (
              <li
                key={key}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm md:p-4"
              >
                <div className="flex flex-col gap-2 md:gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-base font-semibold text-[var(--foreground)]">
                        {entry.title}
                      </h4>
                      {entry.fieldOfStudy && (
                        <span className="text-sm text-[var(--foreground-muted)]">
                          {entry.fieldOfStudy}
                        </span>
                      )}
                    </div>
                    {hasGrade && (
                      <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-500">
                        {t("resumeEducation.grade", { value: entry.grade })}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {entry.institution?.name && (
                      <div className="flex min-w-[12rem] flex-col gap-1">
                        <span className="text-xs uppercase tracking-wide text-[var(--foreground-muted)]">
                          {t("resumeEducation.institution")}
                        </span>
                        <span className="text-[var(--foreground)]">
                          {entry.institution.name}
                        </span>
                        {location && (
                          <span className="text-xs text-[var(--foreground-muted)]">
                            {location}
                          </span>
                        )}
                      </div>
                    )}
                    {timeframe && (
                      <div className="flex min-w-[10rem] flex-col gap-1">
                        <span className="text-xs uppercase tracking-wide text-[var(--foreground-muted)]">
                          {t("resumeEducation.period")}
                        </span>
                        <span className="text-[var(--foreground)]">
                          {timeframe}
                        </span>
                      </div>
                    )}
                    {typeLabel && (
                      <div className="flex min-w-[8rem] flex-col gap-1">
                        <span className="text-xs uppercase tracking-wide text-[var(--foreground-muted)]">
                          {t("educationForm.educationType.label")}
                        </span>
                        <span className="text-[var(--foreground)]">
                          {typeLabel}
                        </span>
                      </div>
                    )}
                  </div>
                  {entry.description && (
                    <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--foreground)]">
                      {entry.description}
                    </p>
                  )}
                  {links.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-xs uppercase tracking-wide text-[var(--foreground-muted)]">
                        {t("portfolio.resumeCard.educationDialog.links")}
                      </span>
                      <ul className="flex flex-col gap-1 text-sm text-indigo-500">
                        {links.map((link) => (
                          <li key={`${key}-${link}`}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                              className="break-all transition hover:text-indigo-400"
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </ThemedDialog>
  )
}
