import type { JSX } from "react"
import type { Skill } from "../../../../api/model"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import StarLevelPicker from "../../../../shared/StarLevelPicker"

export default function SkillRow({
  skill,
  setEdit,
  setDelete: setRemove,
}: {
  skill: Skill
  setEdit: (value: Skill) => void
  setDelete: (value: Skill) => void
}): JSX.Element {
  return (
    <tr className="odd:bg-[var(--background-alt)]/40 transition-colors even:bg-transparent hover:bg-[var(--surface-hover)]">
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        {skill.name}
      </td>
      <td className="px-6 py-4 text-sm text-[var(--foreground)]">
        <StarLevelPicker
          starLevel={() => skill.level!}
          setStarLevel={() => {}}
          isDisabled={() => true}
        />
      </td>
      <td className="flex gap-4 px-6 py-4 text-sm">
        <FontAwesomeIcon
          icon={faEdit}
          className="cursor-pointer rounded bg-blue-500 p-1.5 text-sm text-white transition duration-300 hover:bg-blue-700"
          onClick={() => setEdit(skill)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer rounded bg-red-500 p-1.5 text-sm text-white transition duration-300 hover:bg-red-700"
          onClick={() => setRemove(skill)}
        />
      </td>
    </tr>
  )
}
