import type { Skill } from "../../../../api"
import StarLevelPicker from "../../../../shared/StarLevelPicker"

interface SkillsViewListProps {
  skills: Skill[]
  emptyLabel: string
}

export default function SkillsViewList({
  skills,
  emptyLabel,
}: SkillsViewListProps) {
  if (!skills || skills.length === 0) {
    return (
      <p className="text-sm text-[var(--foreground-muted)]">{emptyLabel}</p>
    )
  }

  return (
    <div className="space-y-2">
      <ul className="grid gap-2 sm:grid-cols-2">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="bg-[var(--surface)]/80 flex flex-col gap-2 rounded-xl border border-[var(--border)] p-3 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {skill.name}
              </span>
              {renderSkillLevel(skill.level)}
            </div>

            {renderSkillDescription(skill.detail ?? skill.description)}

            {skill.domains?.length ? (
              <div className="flex flex-wrap gap-1">
                {skill.domains.map((domain) => (
                  <span
                    key={domain}
                    className="bg-[var(--background-alt)]/80 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--foreground-muted)]"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

function renderSkillLevel(level?: number) {
  if (!level) return null

  return (
    <StarLevelPicker
      starLevel={() => level}
      setStarLevel={() => {}}
      isDisabled={() => true}
    />
  )
}

function renderSkillDescription(description?: string) {
  if (!description) return null

  return (
    <p className="text-xs leading-relaxed text-[var(--foreground-muted)]">
      {description}
    </p>
  )
}
