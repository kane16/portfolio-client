import { useState } from "react"


export default function TextInput(props: {
  setInputValue: (value: string) => void
  getInputValue: () => string
  placeholder: string
  style: string
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
    <label className={props.style}>
      <input
        type={props.isPassword ? "password" : "text"}
        className={`rounded-md border-2 border-slate-300 px-3 py-2 text-base
             font-medium tracking-tight text-slate-900 shadow-xl dark:bg-slate-800 dark:text-white sm:w-${props.inputWidth ? props.inputWidth : 48}`}
        value={props.getInputValue()}
        onFocus={() => changeEraseState("focus")}
        onBlur={() => changeEraseState("loseFocus")}
        placeholder={props.placeholder}
        onChange={(value) => setText(value.target.value)}
      />
      <i
        className={`fa-solid fa-xmark -ml-6 ${
          showErase
            ? "cursor-pointer text-black dark:text-white"
            : "text-white dark:text-slate-800"
        }`}
        onClick={eraseSearch}
      ></i>
    </label>
  )
}