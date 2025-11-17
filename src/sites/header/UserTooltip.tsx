import {
  faArrowRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useAuth } from "../login/use-auth"
import Button from "../../shared/Button"
import { useApplicationClick } from "../../app/application-click-hook"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

export default function UserTooltip() {
  const [isExpanded, setExpanded] = useState(false)
  const { authData, setAuth } = useAuth()
  const { clickHook, setApplicationClick } = useApplicationClick()
  const { t } = useTranslation()
  const navigate = useNavigate()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function uploadImage(): void {
    navigate("/upload-image")
    setExpanded(false)
  }

  return (
    <div className="relative pr-2" onClick={(e) => e.stopPropagation()}>
      <Button
        text={`${authData.user?.username}`}
        onClick={toggleTooltip}
        icon={<FontAwesomeIcon icon={faCircleUser} className="text-2xl" />}
      />
      <div
        className={`${
          isExpanded ? "absolute z-20" : "hidden"
        } right-0 mt-2 w-44 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-lg`}
      >
        <Button
          overrideStyles="rounded-none border-0 bg-transparent hover:bg-[var(--surface-hover)]"
          text={t("userTooltip.userProfile")}
          onClick={() => console.log("User Profile Clicked")}
          icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
        />
        <Button
          overrideStyles="rounded-none border-0 bg-transparent hover:bg-[var(--surface-hover)]"
          text={t("userTooltip.logout")}
          onClick={logout}
          icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
        />
        <Button
          text={t("image.uploadImage")}
          overrideStyles="rounded-none border-0 bg-transparent hover:bg-[var(--surface-hover)]"
          onClick={uploadImage}
          icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
        />
      </div>
    </div>
  )
}
