import { useState } from "react"
import RemovableButton from "./RemovableButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"

export default function MultiSelect<T extends { name: string }>(props: {
  items: T[]
  selectedItems: () => T[]
  selectItem: (item: T) => void
  clearItems: () => void
  placeholder: string
}) {
  const [isDropdownVisible, showDropdown] = useState(false)

  function getFilteredItems() {
    return props.items.filter((item) => !props.selectedItems().includes(item))
  }

  function selectNamedItem(item: T) {
    props.selectItem(item)
    showDropdown(false)
  }

  function handleClearItems(event: React.MouseEvent) {
    event.stopPropagation()
    props.clearItems()
  }

  return (
    <div className={`flex flex-col`}>
      <div
        className="group flex w-72 flex-row items-center justify-between rounded-lg border-2 bg-neutral-800 
        p-2 transition-colors duration-200 hover:cursor-pointer hover:bg-neutral-700"
        onClick={() => showDropdown(!isDropdownVisible)}
      >
        <div className="w-56">
          {props.selectedItems().length === 0 ? (
            <div>{props.placeholder}</div>
          ) : (
            props
              .selectedItems()
              .map((item) => (
                <RemovableButton
                  key={item.name}
                  title={item.name}
                  removeItem={() => props.selectItem(item)}
                />
              ))
          )}
        </div>
        <div className="divide-x">
          <FontAwesomeIcon
            icon={faXmark}
            className={`-ml-6 pr-2 ${
              props.selectedItems().length > 0
                ? "cursor-pointer text-black dark:text-white"
                : "hidden"
            }`}
            onClick={handleClearItems}
          />
          <FontAwesomeIcon
            icon={isDropdownVisible ? faChevronUp : faChevronDown}
            className="fa-solid pl-2"
          />
        </div>
      </div>
      <div
        className={`border-white
        ${isDropdownVisible ? "z-10" : "-z-10"}
        ${props.items.length === 0 ? "hidden" : ""}
        w-48`}
      >
        <div
          className={`border-t-1 absolute -mt-1.5 h-56 w-72 overflow-scroll border-x-2 border-b-2 bg-neutral-800 ${
            isDropdownVisible ? "" : "opacity-0"
          } transition duration-300`}
        >
          {getFilteredItems().map((item) => (
            <div
              key={item.name}
              className="text-black hover:bg-neutral-500 dark:text-white"
              onClick={() => selectNamedItem(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
