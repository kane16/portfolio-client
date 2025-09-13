import type { JSX } from "react"
import { ValidationStatus, type ValidationStep } from "../api/model"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"

export default function ValidationStepperStep({
  step,
  isActive,
  setActive,
}: {
  step: ValidationStep
  isActive: () => boolean
  setActive: () => void
}): JSX.Element {
  return (
    <div className="flex w-40 flex-col items-center justify-center">
      {step.state === ValidationStatus.INVALID && (
        <div
          className={`m-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 p-2 transition duration-300
            ${
              isActive()
                ? "dark:border-red-500 dark:bg-red-400 dark:text-black hover:dark:bg-red-500"
                : "dark:border-red-700 dark:text-red-500 hover:dark:bg-red-700"
            }`}
          onClick={setActive}
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </div>
      )}
      {step.state === ValidationStatus.VALID && (
        <div
          className={`m-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 p-2 transition duration-300
            ${
              isActive()
                ? "border-green-300 bg-green-600 text-green-300 hover:bg-green-700"
                : "border-green-300 text-green-300 hover:bg-green-600"
            }`}
          onClick={setActive}
        >
          <FontAwesomeIcon icon={faCheck} className="text-sm" />
        </div>
      )}
      {step.state === ValidationStatus.NOT_VALIDATED && (
        <div
          className={`m-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition duration-300
            ${
              isActive()
                ? "border-yellow-300 bg-yellow-600 p-2 text-yellow-300 hover:bg-yellow-700"
                : "border-yellow-300 p-2 text-yellow-300 hover:bg-yellow-600"
            }`}
          onClick={setActive}
        >
          <div className="text-sm">?</div>
        </div>
      )}
      <div className="text-center text-sm">{step.name}</div>
    </div>
  )
}
