import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, type JSX } from "react"

interface StarLevelPickerProps {
  starLevel: () => number
  setStarLevel: (level: number) => void
  isDisabled: () => boolean
}

export default function StarLevelPicker({
  starLevel,
  setStarLevel,
  isDisabled,
}: StarLevelPickerProps): JSX.Element {
  const [hoveredLevel, setHoveredLevel] = useState<number>(0)

  function handleLevelHovered(level: number) {
    if (!isDisabled()) {
      setHoveredLevel(level)
    }
  }

  function handleClick(level: number) {
    if (!isDisabled()) {
      setStarLevel(level)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((level) => (
        <FontAwesomeIcon
          icon={faStar}
          key={level}
          className={`${!isDisabled() && `cursor-pointer`} transition duration-100 
            ${hoveredLevel >= level && "text-yellow-800"} 
            ${hoveredLevel === 0 && starLevel() >= level && "text-green-700"}`}
          onClick={() => handleClick(level)}
          onMouseOver={() => handleLevelHovered(level)}
          onMouseOut={() => setHoveredLevel(0)}
        />
      ))}
    </div>
  )
}
