import { useAuth } from "../login/use-auth"
import ThemeToggle from "../../shared/ThemeToggle"
import Navigation from "./Navigation"
import SiteIcon from "./SiteIcon"
import UserTooltip from "./UserTooltip"

export default function Header() {
  const { authData } = useAuth()

  return (
    <div className="flex h-20 w-full items-center justify-between border p-4 shadow-md
     shadow-slate-600 dark:border-gray-400 dark:shadow-slate-600">
      <div className="hidden sm:inline">
        <SiteIcon />
      </div>
      <Navigation />
      {authData.isAuthenticated && (
        <div className="pl-2 sm:flex">
          <UserTooltip />
        </div>
      )}
      <div className="hidden sm:flex">
        <ThemeToggle />
      </div>
    </div>
  )
}
