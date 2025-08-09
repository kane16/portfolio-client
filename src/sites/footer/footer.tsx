import type { JSX } from "react"
import { useTranslation } from "react-i18next"

export default function Footer(): JSX.Element {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  return (
    <footer className="absolute bottom-0 hidden w-full bg-neutral-100 p-2 text-center dark:bg-neutral-900 md:block">
      {t("footer.copyright", { year })}
    </footer>
  )
}
