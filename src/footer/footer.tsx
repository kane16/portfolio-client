import type { JSX } from "react"

export default function Footer(): JSX.Element {
  return (
    <footer className="absolute bottom-0 hidden w-full bg-neutral-100 p-2 text-center dark:bg-neutral-900 md:block">
      Copyright © 2019-{new Date().getFullYear()} DeLukeSoft Łukasz Gumiński
    </footer>
  )
}
