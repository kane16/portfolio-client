import type { JSX } from "react"
import type { Language } from "../../../../api/model"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"

export default function LanguageRow({
  language,
  setEdit,
  setDelete: setRemove,
}: {
  language: Language
  setEdit: (value: Language) => void
  setDelete: (value: Language) => void
}): JSX.Element {
  return (
    <tr className="odd:bg-[var(--background-alt)]/40 transition-colors even:bg-transparent hover:bg-[var(--surface-hover)]">
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {language.name}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {language.level}
      </td>
      <td className="flex gap-4 px-6 py-4 text-sm">
        <FontAwesomeIcon
          icon={faEdit}
          className="cursor-pointer rounded bg-blue-500 p-1.5 text-sm text-white transition duration-300 hover:bg-blue-700"
          onClick={() => setEdit(language)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer rounded bg-red-500 p-1.5 text-sm text-white transition duration-300 hover:bg-red-700"
          onClick={() => setRemove(language)}
        />
      </td>
    </tr>
  )
}
