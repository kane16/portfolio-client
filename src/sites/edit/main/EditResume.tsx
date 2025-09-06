import { useState, type JSX } from "react"
import { Outlet } from "react-router-dom"
import "react-circular-progressbar/dist/styles.css"
import ProgressStatusIndicator from "./ProgressStatusIndicator"
import VerticalStepper from "../../../shared/ValidationVerticalStepper"
import { ValidationStatus, type ValidationResult } from "../../../api/model"

export default function EditResume(): JSX.Element {
  const [validationResult] = useState<ValidationResult>({
    steps: [
      { id: 1, name: "Shortcut", state: ValidationStatus.VALID, messages: [] },
      { id: 1, name: "NOT shortcut", state: ValidationStatus.NOT_VALIDATED, messages: [] },
      {
        id: 2,
        name: "Experience",
        state: ValidationStatus.INVALID,
        messages: [],
      },
    ],
    isValid: false,
  })

  return (
    <div className="grid h-full w-full grid-cols-9 grid-rows-6 items-center justify-center gap-4 p-4">
      <div className="col-span-7 col-start-1 row-span-6 flex h-full w-full justify-center border-2">
        <Outlet />
      </div>
      <div className="col-span-2 col-start-8 row-start-1 flex h-full w-full items-center justify-center border-2">
        <ProgressStatusIndicator progress={75} />
      </div>
      <div className="col-span-2 col-start-8 row-span-5 row-start-2 flex h-full w-full items-center justify-center border-2">
        <VerticalStepper steps={validationResult.steps} />
      </div>
    </div>
  )
}
