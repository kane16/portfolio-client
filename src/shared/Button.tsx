import type { JSX } from "react"

export default function Button({
  text,
  onClick,
  overrideStyles = "",
  icon,
  disabled = false,
}: {
  text: string
  onClick: () => void
  overrideStyles?: string
  icon?: JSX.Element
  disabled?: boolean
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md border-2
        border-black bg-neutral-900 p-2 transition
        duration-300 hover:bg-neutral-200 dark:border-white
        ${disabled ? "cursor-not-allowed opacity-10" : "hover:cursor-pointer dark:hover:bg-neutral-700"}
        ${overrideStyles}`}
    >
      <div>{icon}</div>
      <div>
        <button
          className={`${overrideStyles} ${disabled ? "cursor-not-allowed opacity-10" : "hover:cursor-pointer"}`}
        >
          {text}
        </button>
      </div>
    </div>
  )
}
