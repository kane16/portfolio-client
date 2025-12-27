import type { JSX } from "react"
import NavLink from "../../shared/NavLink"
import { useTranslation } from "react-i18next"

export default function Navigation(): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className="flex w-full flex-col items-center sm:flex-row sm:justify-center sm:gap-6">
      <NavLink title={t("nav.cv")} href="/api/portfolio/pdf" newTab={true} />
      <NavLink title={t("nav.blog")} href="/blog/" newTab={true} />
    </div>
  )
}
