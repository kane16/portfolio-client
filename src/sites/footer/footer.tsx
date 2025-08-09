import type { JSX } from "react"
import { useTranslation } from "react-i18next"

export default function Footer(): JSX.Element {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  return (
    <footer className="absolute bottom-0 hidden w-full border-t border-[var(--border)] bg-[var(--background)] p-2 text-center text-[var(--foreground-muted)] dark:border-[var(--border)] dark:bg-[var(--background)] dark:text-[var(--foreground-muted)] md:block">
      {t("footer.copyright", { year })}
    </footer>
  )
}
