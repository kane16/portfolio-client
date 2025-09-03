import type { JSX } from "react"
import type { ValidationStep } from "../api/model"
import ValidationStepperStep from "./ValidationStepperStep"
import StepperVerticalDivider from "./StepperVerticalDivider"

export default function VerticalStepper({
  steps,
}: {
  steps: ValidationStep[]
}): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center">
      {steps.map((step, index) =>
        index === steps.length - 1 ? (
          <ValidationStepperStep key={step.id} step={step} />
        ) : (
          <>
            <ValidationStepperStep key={step.id} step={step} />
            <StepperVerticalDivider key={`divider-${step.id}`} />
          </>
        ),
      )}
    </div>
  )
}
