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
        border-gray-400 p-2 text-black transition
        duration-300 hover:bg-neutral-300 dark:border-gray-400 dark:text-white dark:hover:border-gray-400
        ${disabled ? "cursor-not-allowed text-black opacity-30 hover:bg-gray-500 dark:hover:text-white" : "hover:cursor-pointer dark:hover:bg-neutral-500 dark:hover:text-white"}
        ${overrideStyles}`}
    >
      <div>{icon}</div>
      <div>
        <button
          className={`${disabled ? "cursor-not-allowed opacity-80" : "hover:cursor-pointer"}`}
        >
          {text}
        </button>
      </div>
    </div>
  )
}
