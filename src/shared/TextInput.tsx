import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function TextInput(props: {
  setInputValue: (value: string) => void
  getInputValue: () => string
  placeholder: string
  inputWidth?: number
  isPassword: boolean
}) {
  const [showErase, setShowErase] = useState(false)

  function setText(text: string) {
    props.setInputValue(text)
    changeEraseState("focus")
  }

  function eraseSearch() {
    props.setInputValue("")
  }

  function changeEraseState(status: string) {
    if (status === "focus" && props.getInputValue().length > 0) {
      setShowErase(true)
    } else if (status === "loseFocus") {
      setShowErase(false)
    }
  }

  return (
    <div className={`w-${props.inputWidth ? props.inputWidth : 48}`}>
      <input
        type={props.isPassword ? "password" : "text"}
        className={`w-full rounded-md border-2 border-neutral-700 px-3 py-2 text-base font-medium text-neutral-900
             transition duration-200 focus:border-neutral-500 focus:outline-none dark:bg-neutral-800 dark:text-white `}
        value={props.getInputValue()}
        onFocus={() => changeEraseState("focus")}
        onBlur={() => changeEraseState("loseFocus")}
        placeholder={props.placeholder}
        onChange={(value) => setText(value.target.value)}
      />
      <FontAwesomeIcon
        icon={faXmark}
        className={`-ml-6 ${
          showErase
            ? "cursor-pointer text-black dark:text-white"
            : "text-white dark:text-slate-800"
        }`}
        onClick={eraseSearch}
      />
    </div>
  )
}
