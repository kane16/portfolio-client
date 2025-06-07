import type { JSX } from "react"
import NavLink from "../shared/NavLink"

export default function Navigation(): JSX.Element {
  return (
    <div className="flex w-full flex-col items-center sm:flex-row sm:justify-center sm:gap-6">
      <NavLink title="CV" href="/api/portfolio/pdf" newTab={true} />
      <NavLink title="Blog" href="/blog" newTab={true} />
    </div>
  )
}
