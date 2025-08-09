"use client"

import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { CircleLoader } from "react-spinners"
import { useTranslation } from "react-i18next"

export default function Search({
  width = 48,
  textChangedHandler,
  isLoading,
}: {
  width?: number
  textChangedHandler: (value: string) => void
  isLoading: boolean
}) {
  const [text, setText] = useState("")
  const [showErase, setShowErase] = useState(false)
  const [operation, setOperation] = useState(0)
  const { t } = useTranslation()

  const onTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    if (e.target.value.length > 0) {
      setShowErase(true)
    } else {
      setShowErase(false)
    }
    clearTimeout(operation)
    setOperation(
      window.setTimeout(() => {
        textChangedHandler(e.target.value)
      }, 300),
    )
  }

  const eraseSearch = () => {
    setText("")
    textChangedHandler("")
    setShowErase(false)
  }

  return (
    <span className="mr-2">
      <input
        className={`w-${width} duration-50 max-w-${width}
          rounded-md border-2 border-gray-500 px-2 py-1 pt-2 text-lg transition
          focus:outline-none focus:ring-1 dark:border-gray-300 dark:bg-neutral-900 dark:text-white dark:focus:ring-gray-100`}
        type="text"
        value={text}
        onChange={onTextChanged}
        placeholder={t("search.placeholder")}
      />
      <span className={`hidden ${isLoading ? "dark:inline" : "dark:hidden"}`}>
        <CircleLoader size={20} color="white" className="-ml-7" />
      </span>
      <span className={`dark:hidden ${isLoading ? "" : "hidden"}`}>
        <CircleLoader size={20} color="black" className="-ml-7" />
      </span>
      <FontAwesomeIcon
        icon={faXmark}
        className={`-ml-6 ${
          showErase && !isLoading
            ? "cursor-pointer text-black dark:text-white"
            : "text-white dark:text-neutral-900"
        }`}
        onClick={eraseSearch}
      ></FontAwesomeIcon>
    </span>
  )
}
