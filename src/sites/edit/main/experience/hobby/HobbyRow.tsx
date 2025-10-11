import type { JSX } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"

interface HobbyRowProps {
  hobby: string
  setEdit: (value: string) => void
  setDelete: (value: string) => void
}

export default function HobbyRow({
  hobby,
  setEdit,
  setDelete: setRemove,
}: HobbyRowProps): JSX.Element {
  return (
    <tr className="odd:bg-[var(--background-alt)]/40 transition-colors even:bg-transparent hover:bg-[var(--surface-hover)]">
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">{hobby}</td>
      <td className="flex gap-4 px-6 py-4 text-sm">
        <FontAwesomeIcon
          icon={faEdit}
          className="cursor-pointer rounded bg-blue-500 p-1.5 text-sm text-white transition duration-300 hover:bg-blue-700"
          onClick={() => setEdit(hobby)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer rounded bg-red-500 p-1.5 text-sm text-white transition duration-300 hover:bg-red-700"
          onClick={() => setRemove(hobby)}
        />
      </td>
    </tr>
  )
}
