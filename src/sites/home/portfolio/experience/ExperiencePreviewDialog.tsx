import type { JSX } from "react"
import { useTranslation } from "react-i18next"
import type {
  Experience,
  Project,
  Skill,
  Timespan,
} from "../../../../api/model"
import ThemedDialog from "../../../../shared/ThemedDialog"

type ExperiencePreviewDialogProps = {
  isOpen: boolean
  onClose: () => void
  experiences: Experience[]
}

type ExperienceItem = Experience | Project

function formatTimeframe(
  timespan: Timespan | undefined,
  presentLabel: string,
): string {
  if (!timespan) return ""
  const start = timespan.start?.trim() ?? ""
  const end = timespan.end?.trim() ?? ""
  const effectiveEnd = end || presentLabel

  if (start && effectiveEnd) {
    return `${start} - ${effectiveEnd}`
  }
  return start || effectiveEnd
}

function sanitizeText(value?: string | null): string {
  return value?.trim() ?? ""
}

function renderSkillLabel(skill: Skill): string {
  const name = sanitizeText(skill.name)
  const detail = sanitizeText(skill.detail || skill.description)
  if (name && detail) {
    return `${name} - ${detail}`
  }
  if (name) return name
  return detail
}

type ExperienceListSectionProps = {
  title: string
  emptyLabel: string
  entries: ExperienceItem[]
  presentLabel: string
  skillsLabel: string
}

function ExperienceListSection({
  title,
  emptyLabel,
  entries,
  presentLabel,
  skillsLabel,
}: ExperienceListSectionProps): JSX.Element {
  return (
    <section className="flex flex-col gap-3">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground-muted)]">
        {title}
      </h4>
      {entries.length === 0 ? (
        <p className="text-sm text-[var(--foreground-muted)]">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {entries.map((entry, index) => {
            const position = sanitizeText(entry.position)
            const business = sanitizeText(entry.business)
            const summary = sanitizeText(entry.summary)
            const description = sanitizeText(entry.description)
            const timeframe = formatTimeframe(entry.timespan, presentLabel)
            const skills = (entry.skills ?? [])
              .map(renderSkillLabel)
              .map((value) => value.trim())
              .filter((value) => value.length > 0)

            const key = entry.id ?? `${position}-${business}-${index}`

            return (
              <li
                key={key}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-1">
                      {position && (
                        <span className="text-base font-semibold text-[var(--foreground)]">
                          {position}
                        </span>
                      )}
                      {business && (
                        <span className="text-sm text-[var(--foreground-muted)]">
                          {business}
                        </span>
                      )}
                    </div>
                    {timeframe && (
                      <span className="whitespace-nowrap rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-500">
                        {timeframe}
                      </span>
                    )}
                  </div>
                  {summary && (
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {summary}
                    </p>
                  )}
                  {description && (
                    <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--foreground)]">
                      {description}
                    </p>
                  )}
                  {skills.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-xs uppercase tracking-wide text-[var(--foreground-muted)]">
                        {skillsLabel}
                      </span>
                      <ul className="flex flex-wrap gap-2">
                        {skills.map((skillLabel, skillIndex) => (
                          <li
                            key={`${key}-${skillLabel}-${skillIndex}`}
                            className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-500"
                          >
                            {skillLabel}
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
    </section>
  )
}

export default function ExperiencePreviewDialog({
  isOpen,
  onClose,
  experiences,
}: ExperiencePreviewDialogProps): JSX.Element {
  const { t } = useTranslation()
  const dialogTitle = t("portfolio.resumeCard.experienceDialog.title")
  const closeLabel = t("common.close")
  const workSectionTitle = t(
    "portfolio.resumeCard.experienceDialog.workSection",
  )
  const workEmptyLabel = t("portfolio.resumeCard.experienceDialog.workEmpty")
  const skillsLabel = t("portfolio.resumeCard.experienceDialog.skills")
  const workPresentLabel = t("resumeExperience.timeframe.present")

  return (
    <ThemedDialog
      open={() => isOpen}
      onClose={onClose}
      title={dialogTitle}
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
      <div className="flex flex-col gap-6">
        <ExperienceListSection
          title={workSectionTitle}
          emptyLabel={workEmptyLabel}
          entries={experiences}
          presentLabel={workPresentLabel}
          skillsLabel={skillsLabel}
        />
      </div>
    </ThemedDialog>
  )
}
