import { useState } from "react"
import { CircleLoader } from "react-spinners"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDefaultResume } from "../../../api/queries"
import ResumeCard from "./card/ResumeCard"
import ResumeSectionTooltip from "./ResumeSectionTooltip"
import EducationPreviewDialog from "./education/EducationPreviewDialog"
import ExperiencePreviewDialog from "./experience/ExperiencePreviewDialog"
import SideProjectsPreviewDialog from "./side-project/SideProjectsPreviewDialog"
import LanguagesPreviewDialog from "./language/LanguagesPreviewDialog"
import {
  faBriefcase,
  faGraduationCap,
  faLanguage,
  faRocket,
} from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"

export default function Portfolio() {
  const { isPending, data: resume } = useDefaultResume()
  const { t } = useTranslation()
  const [educationDialogOpen, setEducationDialogOpen] = useState(false)
  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false)
  const [projectsDialogOpen, setProjectsDialogOpen] = useState(false)
  const [languagesDialogOpen, setLanguagesDialogOpen] = useState(false)

  if (isPending) return <CircleLoader color={"var(--foreground)"} size={60} />
  if (!resume) return <CircleLoader color={"var(--foreground)"} size={60} />

  const composeDescription = (primary: string, secondary?: string): string =>
    secondary ? `${primary}\n${secondary}` : primary

  const educationTooltipDescription = (() => {
    if (!resume.education?.length) {
      return t("portfolio.resumeCard.tooltips.education.empty")
    }
    const latest = resume.education[0]
    const latestSegments = [
      latest?.title?.trim(),
      latest?.institution?.name?.trim(),
    ].filter((segment) => segment && segment.length > 0) as string[]
    const countText = t("portfolio.resumeCard.tooltips.education.count", {
      count: resume.education.length,
    })
    const latestText = latestSegments.length
      ? t("portfolio.resumeCard.tooltips.education.latest", {
          latest: latestSegments.join(" — "),
        })
      : undefined
    return composeDescription(countText, latestText)
  })()

  const workTooltipDescription = (() => {
    if (!resume.workHistory?.length) {
      return t("portfolio.resumeCard.tooltips.work.empty")
    }
    const latest = resume.workHistory[0]
    const latestSegments = [
      latest?.position?.trim(),
      latest?.business?.trim(),
    ].filter((segment) => segment && segment.length > 0) as string[]
    const countText = t("portfolio.resumeCard.tooltips.work.count", {
      count: resume.workHistory.length,
    })
    const latestText = latestSegments.length
      ? t("portfolio.resumeCard.tooltips.work.latest", {
          latest: latestSegments.join(" — "),
        })
      : undefined
    return composeDescription(countText, latestText)
  })()

  const projectsTooltipDescription = (() => {
    if (!resume.sideProjects?.length) {
      return t("portfolio.resumeCard.tooltips.projects.empty")
    }
    const latest = resume.sideProjects[0]
    const latestSegments = [
      latest?.position?.trim(),
      latest?.business?.trim(),
    ].filter((segment) => segment && segment.length > 0) as string[]
    const countText = t("portfolio.resumeCard.tooltips.projects.count", {
      count: resume.sideProjects.length,
    })
    const latestText = latestSegments.length
      ? t("portfolio.resumeCard.tooltips.projects.latest", {
          latest: latestSegments.join(" — "),
        })
      : undefined
    return composeDescription(countText, latestText)
  })()

  const languagesTooltipDescription = (() => {
    if (!resume.languages?.length) {
      return t("portfolio.resumeCard.tooltips.languages.empty")
    }
    const highlights = resume.languages
      .slice(0, 3)
      .map((language) => {
        const trimmedName = language.name.trim()
        if (!trimmedName) {
          return ""
        }
        const level =
          typeof language.level === "string" ? language.level.trim() : ""
        return level ? `${trimmedName} (${level})` : trimmedName
      })
      .filter((value) => value && value.length > 0)
      .join(", ")
    const countText = t("portfolio.resumeCard.tooltips.languages.count", {
      count: resume.languages.length,
    })
    const highlightsText = highlights
      ? t("portfolio.resumeCard.tooltips.languages.list", { list: highlights })
      : undefined
    return composeDescription(countText, highlightsText)
  })()

  return (
    <>
      <div className="flex w-full max-w-4xl flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 text-lg shadow-sm md:grid md:h-[80vh] md:grid-cols-7 md:grid-rows-3">
        <div className="md:col-span-7 md:row-span-3 md:pt-2">
          <div className="h-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="scrollbar-track-[var(--background)] scrollbar-thumb-[var(--surface-hover)] dark:scrollbar-thumb-[var(--foreground-muted)] h-full overflow-y-auto p-4 scrollbar">
              <ResumeCard
                id={resume.id}
                fullname={resume.fullname}
                imageSource={resume.imageSource}
                title={resume.title}
                summary={resume.summary}
                skills={resume.skills}
              />
              <section className="mt-8 grid gap-3 md:grid-cols-2">
                <ResumeSectionTooltip
                  icon={<FontAwesomeIcon icon={faGraduationCap} />}
                  title={t("portfolio.resumeCard.tooltips.education.title")}
                  description={educationTooltipDescription}
                  actionLabel={t(
                    "portfolio.resumeCard.tooltips.education.action",
                  )}
                  onAction={() => setEducationDialogOpen(true)}
                />
                <ResumeSectionTooltip
                  icon={<FontAwesomeIcon icon={faBriefcase} />}
                  title={t("portfolio.resumeCard.tooltips.work.title")}
                  description={workTooltipDescription}
                  actionLabel={t("portfolio.resumeCard.tooltips.work.action")}
                  onAction={() => setExperienceDialogOpen(true)}
                />
                <ResumeSectionTooltip
                  icon={<FontAwesomeIcon icon={faRocket} />}
                  title={t("portfolio.resumeCard.tooltips.projects.title")}
                  description={projectsTooltipDescription}
                  actionLabel={t(
                    "portfolio.resumeCard.tooltips.projects.action",
                  )}
                  onAction={() => setProjectsDialogOpen(true)}
                />
                <ResumeSectionTooltip
                  icon={<FontAwesomeIcon icon={faLanguage} />}
                  title={t("portfolio.resumeCard.tooltips.languages.title")}
                  description={languagesTooltipDescription}
                  actionLabel={t(
                    "portfolio.resumeCard.tooltips.languages.action",
                  )}
                  onAction={() => setLanguagesDialogOpen(true)}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
      {educationDialogOpen && (
        <EducationPreviewDialog
          isOpen={educationDialogOpen}
          onClose={() => setEducationDialogOpen(false)}
          education={resume.education ?? []}
        />
      )}
      {experienceDialogOpen && (
        <ExperiencePreviewDialog
          isOpen={experienceDialogOpen}
          onClose={() => setExperienceDialogOpen(false)}
          experiences={resume.workHistory ?? []}
        />
      )}
      {projectsDialogOpen && (
        <SideProjectsPreviewDialog
          isOpen={projectsDialogOpen}
          onClose={() => setProjectsDialogOpen(false)}
          projects={resume.sideProjects ?? []}
        />
      )}
      {languagesDialogOpen && (
        <LanguagesPreviewDialog
          isOpen={languagesDialogOpen}
          onClose={() => setLanguagesDialogOpen(false)}
          languages={resume.languages ?? []}
        />
      )}
    </>
  )
}
