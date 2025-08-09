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
  return newTab ? (
    <a
      href={href}
      target="_blank"
      className="p-2 text-2xl text-black transition
      duration-300 hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
    >
      <span>{title}</span>
    </a>
  ) : (
    <Link
      to={href}
      className="p-2 text-2xl text-black transition
      duration-300 hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
    >
      <span>{title}</span>
    </Link>
  )
}
