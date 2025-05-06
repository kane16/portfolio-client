import ThemeToggle from "../(shared)/ThemeToggle"
import Navbar from "./navbar"

export default function Header() {
  return (
    <div className="flex w-full justify-between border p-4 shadow-md shadow-slate-600 dark:border-white dark:shadow-amber-50">
      <div></div>
      <Navbar />
      <ThemeToggle />
    </div>
  )
}
