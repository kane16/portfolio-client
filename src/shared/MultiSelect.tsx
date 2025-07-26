import { useEffect, useState } from "react"
import RemovableButton from "./RemovableButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { useApplicationClick } from "../app/application-click-hook"

export default function MultiSelect<T extends { name: string }>(props: {
  items: T[]
  selectedItems: () => T[]
  selectItem: (item: T) => void
  clearItems: () => void
  placeholder: string
}) {
  const [isDropdownVisible, showDropdown] = useState(false)
  const { clickHook, setApplicationClick } = useApplicationClick()

  useEffect(() => {
    if (!isDropdownVisible && clickHook?.applicationClick === true) {
      setApplicationClick({
        applicationClick: false,
        preventApplicationClick: true,
      })
    } else if (
      clickHook?.preventApplicationClick === true &&
      isDropdownVisible
    ) {
      setApplicationClick({
        applicationClick: false,
        preventApplicationClick: false,
      })
    }
  }, [isDropdownVisible])

  useEffect(() => {
    if (clickHook?.applicationClick === true && isDropdownVisible) {
      showDropdown(false)
      setApplicationClick({
        applicationClick: false,
        preventApplicationClick: true,
      })
    }
  }, [clickHook?.applicationClick])

  function getFilteredItems() {
    const selectedItemsNames = props.selectedItems().map((item) => item.name)
    return props.items.filter((item) => !selectedItemsNames.includes(item.name))
  }

  function selectNamedItem(item: T) {
    props.selectItem(item)
    showDropdown(false)
    setApplicationClick({
      applicationClick: false,
      preventApplicationClick: true,
    })
  }

  function handleClearItems(event: React.MouseEvent) {
    event.stopPropagation()
    props.clearItems()
  }

  return (
    <div className={`flex flex-col`} onClick={(e) => e.stopPropagation()}>
      <div
        className="group flex w-72 flex-row items-center justify-between rounded-lg border-2 bg-neutral-800 
        p-2 transition-colors duration-200 hover:bg-neutral-700"
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
                ? "cursor-pointer text-black transition duration-200 dark:text-white hover:dark:text-neutral-500"
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
          className={`border-t-1 absolute -mt-1.5 w-72 overflow-scroll border-x-2 border-b-2 bg-neutral-800 ${
            isDropdownVisible ? "" : "opacity-0"
          } transition duration-300`}
        >
          {getFilteredItems().map((item) => (
            <div
              key={item.name}
              className="p-1 text-black hover:cursor-pointer hover:bg-neutral-500 dark:text-white"
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
