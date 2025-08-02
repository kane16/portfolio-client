import {
  faArrowRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useAuth } from "../login/use-auth"
import Button from "../../shared/Button"
import { useApplicationClick } from "../../app/application-click-hook"

export default function UserTooltip() {
  const [isExpanded, setExpanded] = useState(false)
  const { authData, setAuth } = useAuth()
  const { clickHook, setApplicationClick } = useApplicationClick()

  function logout(): void {
    setAuth({
      isAuthenticated: false,
      user: null,
    })
  }

  useEffect(() => {
    if (isExpanded && clickHook?.applicationClick) {
      setExpanded(false)
      setApplicationClick({
        applicationClick: false,
        preventApplicationClick: true,
      })
    }
  }, [clickHook.applicationClick])

  function toggleTooltip(): void {
    if (!isExpanded) {
      setApplicationClick({
        applicationClick: false,
        preventApplicationClick: false,
      })
    }
    setExpanded(!isExpanded)
  }

  return (
    <div className="tooltip pr-2">
      <Button
        text={`${authData.user?.username}`}
        onClick={toggleTooltip}
        icon={<FontAwesomeIcon icon={faCircleUser} className="text-2xl" />}
      />
      <div
        className={`${isExpanded ? "absolute" : "hidden"} tooltip-content border-white-600 mt-2 flex w-36 flex-col
        rounded-sm border-y-2 text-lg`}
      >
        <Button
          overrideStyles="border-y-0 rounded-none"
          text="User Profile"
          onClick={() => console.log("User Profile Clicked")}
          icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
        />
        <Button
          overrideStyles="border-y-0 rounded-none"
          text="Logout"
          onClick={logout}
          icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
        />
      </div>
    </div>
  )
}
