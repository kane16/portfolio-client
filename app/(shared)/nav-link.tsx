"use client"

import Link, { useLinkStatus } from "next/link"
import { CircleLoader } from "react-spinners"

export default function NavLink({
  title,
  href,
}: {
  title: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="trnasition p-2 text-2xl duration-300 hover:text-gray-500 dark:hover:text-gray-400"
    >
      <span>
        {title} <LinkLoading />
      </span>
    </Link>
  )
}

export function LinkLoading() {
  const { pending } = useLinkStatus()

  return pending ? (
    <>
      <span className="hidden dark:inline">
        <CircleLoader size={20} color="white" className="ml-2" />
      </span>
      <span className="dark:hidden">
        <CircleLoader size={20} color="black" className="ml-2" />
      </span>
    </>
  ) : (
    <span className="ml-2"></span>
  )
}
