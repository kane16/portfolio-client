import { JSX } from "react"
import NavLink from "../(shared)/nav-link"

export default function Navbar(): JSX.Element {
  return (
    <div className="flex flex-row gap-6">
      <NavLink title="Dashboard" href="/" />
      <NavLink title="Projects" href="/projects" />
      <NavLink title="Blog" href="/blog" />
    </div>
  )
}
