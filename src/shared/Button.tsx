import type { JSX } from "react"

export default function Button({
  text,
  onClick,
  overrideStyles = "",
  icon,
  disabled = () => false,
  isSelected = () => false,
}: {
  text: string
  onClick: () => void
  overrideStyles?: string
  icon?: JSX.Element
  disabled?: () => boolean
  isSelected?: () => boolean
}) {
  function submit() {
    if (!disabled()) {
      onClick()
    }
  }

  return (
    <div
      onClick={submit}
      className={`flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--foreground)] transition
        duration-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--foreground-muted)] hover:bg-[var(--surface-hover)]
        ${isSelected() ? "ring-2 ring-indigo-500" : ""}
        ${disabled() ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${overrideStyles}`}
    >
      {icon && <div>{icon}</div>}
      <button
        className={`${disabled() ? "cursor-not-allowed opacity-80" : "cursor-pointer focus:outline-none"}`}
        type="button"
        disabled={disabled()}
      >
        {text}
      </button>
    </div>
  )
}
