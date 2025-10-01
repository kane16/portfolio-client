import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface CheckboxProps {
  label: string
  checked: boolean
  onChecked: (checked: boolean) => void
}

export default function Checkbox({ label, checked, onChecked }: CheckboxProps) {
  return (
    <div className="flex gap-2">
      <div
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border-2 border-[var(--border)] p-1 transition duration-300 hover:border-gray-500"
        onClick={() => onChecked(!checked)}
      >
        {checked && (
          <FontAwesomeIcon
            icon={faCheck}
            className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          />
        )}
      </div>
      <label className="pt-0.5 text-sm text-[var(--foreground)]">{label}</label>
    </div>
  )
}
