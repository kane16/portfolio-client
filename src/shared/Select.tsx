import type { JSX } from "react"

interface SelectProps {
  items: string[]
  selectedItem: () => string | null
  selectItem: (item: string) => void
  placeholder: string
}

export default function Select({
  items,
  selectedItem,
  selectItem,
  placeholder,
}: SelectProps): JSX.Element {
  return (
    <select
      onChange={(event) => selectItem(event.target.value)}
      className="w-72 cursor-pointer rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground-muted)]"
    >
      {items.map((item) => (
        <option
          key={item}
          value={item}
          selected={selectedItem() === item}
          className="bg-[var(--surface)] text-[var(--foreground)]"
        >
          {item}
        </option>
      ))}
      {(selectedItem() === null) && (
        <option disabled selected className="text-[var(--foreground-muted)]">
          {placeholder}
        </option>
      )}
    </select>
  )
}
