import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Theme } from "./model/theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ThemeToggle() {
  const [theme, setTheme] = useState(Theme.light)

  useEffect(() => {
    const isInitialDark: boolean =
      sessionStorage.getItem("theme") === "dark" ||
      Cookies.get("theme") === "dark"
    if (isInitialDark) {
      document.documentElement.classList.add("dark")
      setTheme(Theme.dark)
    }
  }, [])

  function changeTheme() {
    switch (theme) {
      case Theme.light:
        document.documentElement.classList.add("dark")
        Cookies.remove("theme")
        Cookies.set("theme", "dark", { expires: 365 })
        sessionStorage.setItem("theme", "dark")
        setTheme(Theme.dark)
        break
      case Theme.dark:
        document.documentElement.classList.remove("dark")
        Cookies.remove("theme")
        Cookies.set("theme", "light", { expires: 365 })
        sessionStorage.removeItem("theme")
        setTheme(Theme.light)
        break
    }
  }

  return (
    <button
      onClick={changeTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition duration-200 hover:bg-[var(--surface-hover)] focus:outline-none"
      aria-label="Toggle Theme"
    >
      <FontAwesomeIcon
        icon={theme === Theme.light ? Theme.dark : Theme.light}
      />
    </button>
  )
}

export default ThemeToggle
