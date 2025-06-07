import ThemeToggle from "../shared/ThemeToggle"
import Navigation from "./Navigation"
import SiteIcon from "./SiteIcon"

export default function Header() {
  return (
    <div className="flex w-full justify-between border p-4 shadow-md shadow-slate-600 dark:border-white dark:shadow-amber-50">
      <div className="hidden sm:inline">
        <SiteIcon />
      </div>
      <Navigation />
      <div className="hidden sm:flex">
        <ThemeToggle />
      </div>
    </div>
  )
}
