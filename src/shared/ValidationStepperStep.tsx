import type { JSX } from "react"
import { ValidationStatus, type ValidationStep } from "../api/model"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

export default function ValidationStepperStep({
  step,
}: {
  step: ValidationStep
}): JSX.Element {
  return (
    <div className="flex w-40 flex-col items-center justify-center">
      {step.state === ValidationStatus.VALID && (
        <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full border-2 p-2">
          <div className="text-sm">{step.id}</div>
        </div>
      )}
      {step.state === ValidationStatus.INVALID && (
        <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-300 p-2 text-green-300">
          <FontAwesomeIcon icon={faCheck} className="text-sm" />
        </div>
      )}
      {step.state === ValidationStatus.NOT_VALIDATED && (
        <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-yellow-300 p-2 text-yellow-300">
          <div className="text-sm">?</div>
        </div>
      )}
      <div className="text-center text-sm">{step.name}</div>
    </div>
  )
}
