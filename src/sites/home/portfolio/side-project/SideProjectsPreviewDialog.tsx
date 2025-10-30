import type { JSX } from "react"
import { useTranslation } from "react-i18next"
import type { Project, Skill, Timespan } from "../../../../api/model"
import ThemedDialog from "../../../../shared/ThemedDialog"

type SideProjectsPreviewDialogProps = {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
}

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

export default function SideProjectsPreviewDialog({
  isOpen,
  onClose,
  projects,
}: SideProjectsPreviewDialogProps): JSX.Element {
  const { t } = useTranslation()
  const dialogTitle = t("portfolio.resumeCard.projectsDialog.title")
  const closeLabel = t("common.close")
  const emptyLabel = t("portfolio.resumeCard.projectsDialog.empty")
  const skillsLabel = t("portfolio.resumeCard.projectsDialog.skills")
  const presentLabel = t("resumeSideProject.timeframe.present")

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
      {projects.length === 0 ? (
        <p className="text-sm text-[var(--foreground-muted)]">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {projects.map((project, index) => {
            const title = sanitizeText(project.position)
            const organization = sanitizeText(project.business)
            const summary = sanitizeText(project.summary)
            const description = sanitizeText(project.description)
            const timeframe = formatTimeframe(project.timespan, presentLabel)
            const skills = (project.skills ?? [])
              .map(renderSkillLabel)
              .map((value) => value.trim())
              .filter((value) => value.length > 0)

            const key = project.id ?? `${title}-${organization}-${index}`

            return (
              <li
                key={key}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-1">
                      {title && (
                        <span className="text-base font-semibold text-[var(--foreground)]">
                          {title}
                        </span>
                      )}
                      {organization && (
                        <span className="text-sm text-[var(--foreground-muted)]">
                          {organization}
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
    </ThemedDialog>
  )
}
