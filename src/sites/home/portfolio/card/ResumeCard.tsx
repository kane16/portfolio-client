import { useTranslation } from "react-i18next"
import type { Skill } from "../../../../api/model"
import SkillsViewList from "./SkillsViewList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPrint } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../../login/use-auth"

export interface ResumeCardProps {
  id: number
  fullname: string
  imageSource: string
  title: string
  summary: string
  skills: Skill[]
}

export default function ResumeCard({
  id,
  fullname,
  imageSource,
  title,
  summary,
  skills,
}: ResumeCardProps) {
  const { t } = useTranslation()
  const initials =
    fullname
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "?"
  const { isAuthenticated } = useAuth()

  function navigateToPrint() {
    if (!isAuthenticated) {
      window.open(`/api/portfolio/pdf`, "_blank", "noreferrer")
    } else {
      window.open(`/api/portfolio/pdf/${id}`, "_blank", "noreferrer")
    }
  }

  return (
    <article className="flex flex-col gap-6">
      <header className="flex justify-between">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:text-left">
          <div className="flex h-full w-28 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-hover)] shadow-sm">
            {imageSource ? (
              <img
                src={imageSource}
                alt={fullname}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="text-2xl font-semibold uppercase text-[var(--foreground-muted)]">
                {initials}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">
              {fullname}
            </h2>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--foreground-muted)]">
              {title}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label={t("portfolio.resumeCard.print")}
          onClick={navigateToPrint}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm transition hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground-muted)]"
        >
          <FontAwesomeIcon icon={faPrint} className="text-xl" />
        </button>
      </header>
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-muted)]">
          {t("portfolio.resumeCard.summary")}
        </h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--foreground)]">
          {summary}
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-muted)]">
          {t("portfolio.resumeCard.skills")}
        </h3>
        <SkillsViewList
          skills={skills}
          emptyLabel={t("portfolio.resumeCard.noSkills")}
        />
      </section>
    </article>
  )
}
