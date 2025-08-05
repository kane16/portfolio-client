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
    <label className="m-2 h-8 w-14 cursor-pointer rounded-3xl border-4 shadow-xl ring-slate-900/5 dark:border-amber-50">
      <input
        type="checkbox"
        className="h-0 w-0 opacity-0"
        defaultChecked={theme === Theme.dark}
        onClick={changeTheme}
      />
      <span
        className={`absolute h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-center shadow-inner duration-300 dark:bg-gray-500 ${
          theme === Theme.dark ? "translate-x-6" : ""
        }`}
      >
        <FontAwesomeIcon icon={theme} className="text-black dark:text-white" />
      </span>
    </label>
  )
}

export default ThemeToggle
