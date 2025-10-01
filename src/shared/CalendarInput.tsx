import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, type ChangeEvent, type MouseEvent } from "react"

interface CalendarInputProps {
  date?: Date
  setDate: (date: Date) => void
  fullWidth?: boolean
  className?: string
}

export default function CalendarInput({
  date,
  setDate,
  fullWidth = false,
  className = "",
}: CalendarInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function changeDate(event: ChangeEvent<HTMLInputElement>) {
    setDate(new Date(event.target.value))
  }

  function openPicker(event: MouseEvent<HTMLDivElement>) {
    if (!inputRef.current) {
      return
    }

    const target = event.target as HTMLElement | null
    if (target && target.tagName === "INPUT") {
      return
    }

    const picker = inputRef.current as HTMLInputElement & {
      showPicker?: () => void
    }

    if (picker.showPicker) {
      picker.showPicker()
    } else {
      picker.focus()
    }
  }

  const containerClassName =
    `calendar-input group inline-flex items-center gap-8 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--foreground)] transition duration-200 hover:cursor-pointer hover:bg-[var(--surface-hover)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--foreground-muted)] ${
      fullWidth ? "w-full" : "min-w-[12rem] max-w-full"
    } ${className}`.trim()

  return (
    <div className={containerClassName} onClick={openPicker}>
      <FontAwesomeIcon
        icon={faCalendarDays}
        className="text-base text-[var(--foreground-muted)] group-hover:text-[var(--foreground)]"
      />
      <input
        ref={inputRef}
        type="date"
        value={date ? date.toISOString().split("T")[0] : ""}
        onChange={changeDate}
        className="min-w-0 flex-1 cursor-pointer appearance-none bg-transparent text-base text-[var(--foreground)] focus:outline-none"
      />
    </div>
  )
}
