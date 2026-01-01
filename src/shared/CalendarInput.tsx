import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  useRef,
  useState,
  useEffect,
  type ChangeEvent,
  type MouseEvent,
} from "react"
import { toLocalISODate } from "../app/utils"

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
  const dateInputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (date && !isNaN(date.getTime())) {
      const day = date.getDate().toString().padStart(2, "0")
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const year = date.getFullYear()
      setInputValue(`${day}-${month}-${year}`)
      setError(null)
    } else if (!date) {
      setInputValue("")
      setError(null)
    }
  }, [date])

  function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setInputValue(value)

    if (!value) {
      setError(null)
      return
    }

    const regex = /^(\d{2})-(\d{2})-(\d{4})$/
    const match = value.match(regex)

    if (match && match[1] && match[2] && match[3]) {
      const day = parseInt(match[1], 10)
      const month = parseInt(match[2], 10)
      const year = parseInt(match[3], 10)

      const newDate = new Date(year, month - 1, day)

      if (
        newDate.getFullYear() === year &&
        newDate.getMonth() === month - 1 &&
        newDate.getDate() === day
      ) {
        setDate(newDate)
        setError(null)
      } else {
        setError("Invalid date")
      }
    } else {
      setError("Format: DD-MM-YYYY")
    }
  }

  function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    if (value) {
      const parts = value.split("-")
      if (parts.length === 3) {
        const year = parseInt(parts[0]!, 10)
        const month = parseInt(parts[1]!, 10)
        const day = parseInt(parts[2]!, 10)
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          const localDate = new Date(year, month - 1, day)
          setDate(localDate)
          setError(null)
          return
        }
      }
      setError("Invalid date")
    }
  }

  function openPicker(event: MouseEvent<HTMLDivElement>) {
    if (!dateInputRef.current) {
      return
    }

    const target = event.target as HTMLElement | null
    if (target && target.tagName === "INPUT") {
      return
    }

    if (dateInputRef.current.showPicker) {
      dateInputRef.current.showPicker()
    } else {
      dateInputRef.current.focus()
    }
  }

  const wrapperClass = `${
    fullWidth ? "w-full" : "min-w-[12rem] max-w-full"
  } ${className}`.trim()

  const containerClassName =
    "calendar-input group inline-flex w-full items-center gap-8 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--foreground)] transition duration-200 hover:cursor-pointer hover:bg-[var(--surface-hover)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--foreground-muted)]"

  return (
    <div className={wrapperClass}>
      <div className={containerClassName} onClick={openPicker}>
        <FontAwesomeIcon
          icon={faCalendarDays}
          className="text-base text-[var(--foreground-muted)] group-hover:text-[var(--foreground)]"
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleTextChange}
          placeholder="DD-MM-YYYY"
          className="min-w-0 flex-1 cursor-text appearance-none bg-transparent text-base text-[var(--foreground)] focus:outline-none"
        />
        <input
          ref={dateInputRef}
          type="date"
          className="sr-only"
          onChange={handleDateChange}
          value={date && !isNaN(date.getTime()) ? toLocalISODate(date) : ""}
          tabIndex={-1}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
