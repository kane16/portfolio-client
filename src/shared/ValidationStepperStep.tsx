import type { JSX } from "react"
import { ValidationStatus, type ValidationStep } from "../api/model"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons"

export default function ValidationStepperStep({
  step,
  isActive,
  setActive,
  isDisabled,
}: {
  step: ValidationStep
  isActive: () => boolean
  setActive: () => void
  isDisabled: boolean
}): JSX.Element {
  return (
    <div className="flex w-24 flex-col items-center justify-center">
      {isDisabled && (
        <div
          className={`m-2 flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full border-2 border-gray-500 bg-gray-300 p-2 text-gray-500`}
        >
          <FontAwesomeIcon icon={faMinus} className="text-sm" />
        </div>
      )}
      {!isDisabled && step.status === ValidationStatus.INVALID && (
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
      {!isDisabled && step.status === ValidationStatus.VALID && (
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
      {!isDisabled && step.status === ValidationStatus.NOT_VALIDATED && (
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
