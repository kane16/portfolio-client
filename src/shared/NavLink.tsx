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
  return (
    newTab ? (<a href={href} target="_blank" className="trnasition p-2 text-2xl duration-300 hover:text-gray-500 dark:hover:text-gray-400">
      <span>
        {title}
      </span>
    </a>) :
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
