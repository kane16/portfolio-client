import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../auth/use-auth"
import ThemeToggle from "../shared/ThemeToggle"
import Navigation from "./Navigation"
import SiteIcon from "./SiteIcon"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  const { authData } = useAuth()

  console.log("Header authData:", authData)

  return (
    <div className="flex w-full justify-between border p-4 shadow-md shadow-slate-600 dark:border-white dark:shadow-amber-50">
      <div className="hidden sm:inline">
        <SiteIcon />
      </div>
      <Navigation />
      <div className="hidden sm:flex">
        <ThemeToggle />
      </div>
      {authData.isAuthenticated && (
        <div className="pl-2">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="cursor-pointer pt-1 text-4xl transition duration-300 hover:text-neutral-500"
          />
        </div>
      )}
    </div>
  )
}
