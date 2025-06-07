import { Link } from "react-router-dom"

export default function NavLink({
  title,
  href,
}: {
  title: string
  href: string
}) {
  return (
    <Link
      to={href}
      className="trnasition p-2 text-2xl duration-300 hover:text-gray-500 dark:hover:text-gray-400"
    >
      <span>
        {title}
      </span>
    </Link>
  )
}
