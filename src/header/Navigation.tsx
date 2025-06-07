import type { JSX } from "react"
import NavLink from "../shared/nav-link"

export default function Navigation(): JSX.Element {
  return (
    <div className="flex w-full flex-col items-center sm:flex-row sm:justify-center sm:gap-6">
      <NavLink title="Dashboard" href="/" />
      <NavLink title="Projects" href="/projects" />
      <NavLink title="Blog" href="/blog" />
    </div>
  )
}
