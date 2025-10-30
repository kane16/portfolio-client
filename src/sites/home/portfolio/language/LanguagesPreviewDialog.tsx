import type { JSX } from "react"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { LANGUAGE_LEVELS, type Language } from "../../../../api/model"
import ThemedDialog from "../../../../shared/ThemedDialog"
import StarLevelPicker from "../../../../shared/StarLevelPicker"

type LanguagesPreviewDialogProps = {
  isOpen: boolean
  onClose: () => void
  languages: Language[]
}

function resolveLevelIndex(level: Language["level"]): number {
  return Math.max(
    LANGUAGE_LEVELS.findIndex((entry) => entry === level),
    0,
  )
}

const MAX_STARS = 5

function languageLevelToStars(level: Language["level"]): number {
  const levelIndex = resolveLevelIndex(level)
  const maxIndex = LANGUAGE_LEVELS.length - 1
  if (maxIndex <= 0) return MAX_STARS
  const normalized = (levelIndex / maxIndex) * (MAX_STARS - 1)
  return Math.round(normalized) + 1
}

export default function LanguagesPreviewDialog({
  isOpen,
  onClose,
  languages,
}: LanguagesPreviewDialogProps): JSX.Element {
  const { t } = useTranslation()
  const dialogTitle = t("portfolio.resumeCard.languagesDialog.title")
  const closeLabel = t("common.close")
  const emptyLabel = t("portfolio.resumeCard.languagesDialog.empty")
  const proficiencyLabel = t("portfolio.resumeCard.languagesDialog.proficiency")

  const sortedLanguages = useMemo(() => {
    return [...languages].sort((a, b) => {
      const aIndex = resolveLevelIndex(a.level)
      const bIndex = resolveLevelIndex(b.level)
      if (bIndex === aIndex) {
        return a.name.localeCompare(b.name)
      }
      return bIndex - aIndex
    })
  }, [languages])

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
      {sortedLanguages.length === 0 ? (
        <p className="text-sm text-[var(--foreground-muted)]">{emptyLabel}</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {sortedLanguages.map((language, index) => {
            const displayName = language.name.trim()
            const displayLevel = language.level
            const itemKey =
              language.id ?? `${displayName}-${displayLevel}-${index}`
            const stars = languageLevelToStars(language.level)

            return (
              <li
                key={itemKey}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-base font-semibold text-[var(--foreground)]">
                      {displayName ||
                        t("portfolio.resumeCard.languagesDialog.unknown")}
                    </span>
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-indigo-500">
                      {displayLevel}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wide text-[var(--foreground-muted)]">
                      {proficiencyLabel}
                    </span>
                    <StarLevelPicker
                      starLevel={() => stars}
                      setStarLevel={() => undefined}
                      isDisabled={() => true}
                      className="text-2xl"
                    />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </ThemedDialog>
  )
}
