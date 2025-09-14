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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownVisible])

  useEffect(() => {
    if (clickHook?.applicationClick === true && isDropdownVisible) {
      showDropdown(false)
      setApplicationClick({
        applicationClick: false,
        preventApplicationClick: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div
      className={`relative flex flex-col`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="group flex w-72 flex-row items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--foreground)] transition-colors duration-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--foreground-muted)] hover:bg-[var(--surface-hover)]"
        onClick={() => showDropdown(!isDropdownVisible)}
      >
        <div className="w-56">
          {props.selectedItems().length === 0 ? (
            <div className="text-[var(--foreground-muted)]">
              {props.placeholder}
            </div>
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
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faXmark}
            className={`${
              props.selectedItems().length > 0
                ? "cursor-pointer text-[var(--foreground-muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
                : "hidden"
            }`}
            onClick={handleClearItems}
          />
          <FontAwesomeIcon
            icon={isDropdownVisible ? faChevronUp : faChevronDown}
            className="text-[var(--foreground-muted)] transition-colors duration-200 group-hover:text-[var(--foreground)]"
          />
        </div>
      </div>

      <div
        className={`absolute left-0 mt-1 max-h-60 w-72 overflow-auto rounded-md border border-[var(--border)] bg-[var(--surface)] shadow-lg transition-opacity duration-200 ${
          isDropdownVisible ? "z-10 opacity-100" : "-z-10 opacity-0"
        } ${props.items.length === 0 ? "hidden" : ""}`}
      >
        {getFilteredItems().map((item) => (
          <div
            key={item.name}
            className="px-3 py-2 text-[var(--foreground)] hover:cursor-pointer hover:bg-[var(--surface-hover)]"
            onClick={() => selectNamedItem(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}
