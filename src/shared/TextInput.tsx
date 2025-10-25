import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export enum DataInputType {
  TEXT,
  NUMBER
}

export default function TextInput(props: {
  setInputValue: (value: string) => void
  getInputValue: () => string
  placeholder: string
  inputWidth?: number
  isPassword: boolean,
  type: DataInputType
}) {
  const [showErase, setShowErase] = useState(false)

  function setText(text: string) {
    if (props.type === DataInputType.NUMBER && isNaN(Number(text))) {
      return
    }
    props.setInputValue(text)
    changeEraseState("focus", text)
  }

  function eraseSearch() {
    props.setInputValue("")
  }

  function changeEraseState(status: string, text: string) {
    if (status === "focus" && text.length > 0) {
      setShowErase(true)
    } else {
      setShowErase(false)
    }
  }

  return (
    <div className={`w-${props.inputWidth ? props.inputWidth : 48}`}>
      <input
        type={props.isPassword ? "password" : "text"}
        className={`w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--foreground)] transition duration-200 placeholder:text-[var(--foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground-muted)]`}
        value={props.getInputValue()}
        onFocus={() => changeEraseState("focus", props.getInputValue())}
        onBlur={() => changeEraseState("loseFocus", props.getInputValue())}
        placeholder={props.placeholder}
        onChange={(value) => setText(value.target.value)}
      />
      <FontAwesomeIcon
        icon={faXmark}
        className={`-ml-6 ${
          showErase
            ? "cursor-pointer text-[var(--foreground)]"
            : "text-[var(--surface)]"
        }`}
        onClick={eraseSearch}
      />
    </div>
  )
}
