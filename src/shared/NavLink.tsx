import { Link } from "react-router-dom"

export default function NavLink({
  title,
  href,
  newTab = false,
}: {
  title: string
  href: string
  newTab?: boolean
}) {
  const baseClasses =
    "group relative px-2 py-1 text-xl font-medium text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--foreground-muted)]"

  const content = (
    <>
      <span className="relative z-10">{title}</span>
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--foreground-muted)] transition-all duration-300 ease-out group-hover:w-full" />
    </>
  )

  return newTab ? (
    <a href={href} target="_blank" rel="noreferrer" className={baseClasses}>
      {content}
    </a>
  ) : (
    <Link to={href} className={baseClasses}>
      {content}
    </Link>
  )
}
