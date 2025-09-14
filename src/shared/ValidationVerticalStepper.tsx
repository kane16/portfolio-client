import type { JSX } from "react"
import type { ValidationStep } from "../api/model"
import ValidationStepperStep from "./ValidationStepperStep"
import StepperVerticalDivider from "./StepperVerticalDivider"

export default function VerticalStepper({
  steps,
  activeStepId,
  setActiveStepId,
}: {
  steps: ValidationStep[]
  activeStepId: () => number
  setActiveStepId: (id: number) => void
}): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center">
      {steps.map((step, index) =>
        index === steps.length - 1 ? (
          <ValidationStepperStep
            key={step.id}
            step={step}
            isActive={() => activeStepId() === step.id}
            setActive={() => setActiveStepId(step.id)}
          />
        ) : (
          <div className="flex flex-col items-center" key={step.id}>
            <ValidationStepperStep
              key={step.id}
              step={step}
              isActive={() => activeStepId() === step.id}
              setActive={() => setActiveStepId(step.id)}
            />
            <StepperVerticalDivider key={`divider-${step.id}`} />
          </div>
        ),
      )}
    </div>
  )
}
