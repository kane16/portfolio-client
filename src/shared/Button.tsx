import type { JSX } from "react"

export default function Button({
  text,
  onClick,
  overrideStyles,
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
      className={`flex items-center gap-2 rounded-md border-2
        border-black bg-neutral-900 p-2 transition
       duration-300 hover:cursor-pointer hover:bg-neutral-200 dark:border-white dark:hover:bg-neutral-700 
        ${disabled ? "cursor-not-allowed opacity-50" : ""}
       ${overrideStyles}`
      }
    >
      <div>{icon}</div>
      <div>
        <button onClick={onClick} className={`${overrideStyles}`}>
          {text}
        </button>
      </div>
    </div>
  )
}
